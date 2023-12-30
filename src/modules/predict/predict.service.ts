import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPredict } from './predict.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { CreatePredictDto } from './predict.dto';
import { Predict } from './predict.model';
import { Model, Types } from 'mongoose';
import RestHelper from '../shared/rest/restHelper';

@Injectable()
export class PredictService implements IPredict {
  constructor(
    @Inject('PredictModelToken')
    private readonly precitModel: Model<Predict>,
    private restHelperService: RestHelper,
  ) {}

  async createPredict(createPredict: CreatePredictDto): Promise<{
    status?: boolean;
    data?: Predict;
    message?: string;
    messageType?: number;
  }> {
    try {
      const addPredict = new this.precitModel(createPredict);
      if (addPredict) {
        let converstationId = createPredict.converstationId;
        let oldMessageArray = [];
        const predicts = await this.precitModel
          .find({ converstationId: converstationId }) // ObjectId'yi dönüştürerek sorgu yapın
          .populate([])
          .limit(100)
          .skip(0)
          .exec();
        predicts.map((item: Predict, key: number) => {
          oldMessageArray.push({
            role: 'user',
            content: item?.question,
          });
          oldMessageArray.push({
            role: 'assistant',
            content: item?.answer,
          });
        });
        oldMessageArray.push({
          role: 'user',
          content: createPredict.question,
        });
        const chatGptAnser = await this.restHelperService.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: oldMessageArray,
            temperature: 0.7,
          },
          {
            Authorization: 'Bearer ' + process.env.CHAT_GPT_API_KEY,
          },
        );
        addPredict.answer = chatGptAnser?.data?.choices[0]?.message?.content;
        const result = await addPredict.save();
        return {
          status: true,
          data: result,
          message: 'success to add predict',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'Failed to create predict',
          messageType: 0,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'Failed to add predict',
        messageType: 0,
      };
    }
  }
  async deletePredict(id: string): Promise<{
    status?: boolean;
    data?: Predict;
    message?: string;
    messageType?: number;
  }> {
    const predict = await this.precitModel.findByIdAndDelete(id);
    if (predict) {
      return {
        status: true,
        data: predict,
        message: 'success to delete predict',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'predict not found',
        messageType: 0,
      };
    }
  }
  async findByIdPredict(id: string): Promise<{
    status?: boolean;
    data?: Predict;
    message?: string;
    messageType?: number;
  }> {
    try {
      const predict = await this.precitModel.findById(id).exec();
      if (predict) {
        return {
          status: true,
          data: predict,
          message: 'success to find predict',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'predict not found',
          messageType: 0,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'failed to find by id predict',
        messageType: 0,
      };
    }
  }
  async findPredict(query: QueryDto): Promise<{
    status?: boolean;
    data?: Predict[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    const { where, skip, limit, include } = query;
    try {
      const predicts = await this.precitModel
        .find(where)
        .populate(include)
        .limit(limit)
        .skip(skip)
        .exec();
      const count = await this.precitModel.countDocuments(where).exec();
      return {
        status: true,
        data: predicts,
        message: 'success to find predicts',
        messageType: 0,
        count: count,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to find predicts',
        messageType: 0,
      };
    }
  }
  async findPredictByConverstation(converstationId: string): Promise<{
    status?: boolean;
    data?: Predict[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    try {
      const predicts = await this.precitModel
        .find({ converstationId: new Types.ObjectId(converstationId) }) // ObjectId'yi dönüştürerek sorgu yapın
        .populate([])
        .limit(100)
        .skip(0)
        .exec();
      return {
        status: true,
        data: predicts,
        message: 'success to find predicts',
        messageType: 0,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to find predicts',
        messageType: 0,
      };
    }
  }
}
