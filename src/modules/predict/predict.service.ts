import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { IPredict } from './predict.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { CreatePredictDto } from './predict.dto';
import { Predict } from './predict.model';
import { Model, Types } from 'mongoose';
import RestHelper from '../shared/rest/restHelper';
import http, { IncomingMessage } from 'http';
import axios from 'axios';
import { GetDataGateWay } from './stream.gateway';
@Injectable()
export class PredictService implements IPredict {
  constructor(
    @Inject('PredictModelToken')
    private readonly precitModel: Model<Predict>,
    private restHelperService: RestHelper,
    private readonly gatewayservice: GetDataGateWay,
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
  async createPredictStreamApi(createPredict: CreatePredictDto): Promise<any> {
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
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: oldMessageArray,
            stream: true,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: 'Bearer ' + process.env.CHAT_GPT_API_KEY,
            },
            responseType: 'stream',
          },
        );
        const stream = response.data as unknown as IncomingMessage;
        let answer = '';
        stream.on('data', (chunk: Buffer) => {
          const payloads = chunk.toString().split('\n\n');
          for (const payload of payloads) {
            if (payload.includes('[DONE]')) return;
            if (payload.startsWith('data:')) {
              try {
                const data = payload; //JSON.parse(payload.replace('data: ', ''));
                const dataPayload = JSON.parse(payload.replace('data: ', ''));
                if (dataPayload?.choices[0]?.delta?.content !== undefined) {
                  answer =
                    answer + dataPayload?.choices[0]?.delta?.content || '';
                } else {
                }
                try {
                  const chunk: undefined | string = payload;
                  if (chunk) {
                    this.gatewayservice.onNewMessage({
                      sender: `${createPredict?.converstationId}`,
                      content: dataPayload?.choices[0]?.delta?.content,
                    });
                  }
                } catch (error) {
                  console.log(
                    `Error with JSON.parse and ${payload}.\n${error}`,
                  );
                }
              } catch (error) {}
            }
          }
        });
        stream.on('end', async () => {
          this.gatewayservice.onNewMessage({
            sender: `${createPredict?.converstationId}`,
            content: 'finish response',
          });
          addPredict.answer = answer;
          const result = await addPredict.save();
          setTimeout(() => {
            return {
              status: true,
              data: result,
              message: 'success to add predict',
              messageType: 0,
            };
          }, 0);
        });
        stream.on('error', (err: Error) => {
          this.gatewayservice.onNewMessage({
            sender: `${createPredict?.converstationId}`,
            content: 'error response',
          });
          console.log(err);
        });
      }
      return {
        status: true,
        data: {},
        message: 'success to add predict',
        messageType: 0,
      };
    } catch (error) {
      console.log(error);
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
    const { where, skip, sort, limit, include } = query;
    try {
      const predicts = await this.precitModel
        .find(where)
        .populate(include)
        .sort(sort)
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
