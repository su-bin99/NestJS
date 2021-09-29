import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  //app에 싱글톤 패턴 적용
  public app: express.Application;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    //라우터에 대한 미들웨어도 분리
    //이유 :지금은 cats라는 모듈 하나만 있음
    // 나중에는 각각의 라우터를 분리할 수 있음
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middle");
      next();
    });

    //* JSON middleware
    this.app.use(express.json());
    //body에 적혀서 넘어오는 내용을 json으로 읽을 수 있게 해주는 미들웨어

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is error middle");
      res.send({ error: "404  not found" });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log("server is on..");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
