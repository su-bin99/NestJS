import { Module } from '@nestjs/common';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { AdminModule as AdminBroModule } from '@adminjs/nestjs';
import { BlogModule } from 'src/blog/blog.module';
import { Blog } from 'src/blog/blog.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    AdminBroModule.createAdminAsync({
      imports: [BlogModule],
      inject: [getModelToken(Blog.name)],
      useFactory: (blogModel: Model<Blog>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [{ resource: blogModel }],
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
    }),
  ],
})
export class AdminModule {}
