import { inject, injectable } from 'tsyringe';
import { IAppController } from '../types/app.type';
import {
  AppInfoDTO,
  IDemoRepository,
  IAppService,
  AppUsecase,
  INJECT_SVC_APP_SERVICE,
} from '@rfjs/modules';
import {
  Body,
  Ctx,
  Get,
  JsonController,
  Post,
  QueryParam,
  UploadedFiles,
} from 'routing-controllers';
import { File } from '@koa/multer';
import { fileUploadOptions } from '../common/helpers/upload.helper';
import { Context } from 'koa';
import { ApiResDTO, ApiResSchema } from '@rfjs/common';

@injectable()
@JsonController('/app')
export class AppController implements IAppController {
  constructor(
    @inject(INJECT_SVC_APP_SERVICE)
    private readonly appSvc: IAppService,
    @inject(AppUsecase)
    private readonly appUCase: AppUsecase,
  ) {}

  @Get()
  @ApiResSchema(AppInfoDTO)
  async getAppInfo() {
    const data = this.appSvc.getAppInfo();
    const result: ApiResDTO<AppInfoDTO> = {
      success: true,
      status: 200,
      result: {
        data,
      },
    };
    return result;
  }

  @Get('/db')
  async getTest() {
    return this.appUCase.getTestData();
  }

  /* @Post()
  async postAppData(
    @Body() body: ReqAppBodyDTO,
  ) {
    return body;
  } */

  @Get('/query')
  async queryAppData(@QueryParam('id') id: any) {
    return { id };
  }

  @Post('/files')
  async uploadFiles(
    @Ctx() ctx: Context,
    @UploadedFiles('files', { options: fileUploadOptions() }) files: File[],
  ) {
    return files;
  }
}
