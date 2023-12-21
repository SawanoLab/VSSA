## Volleyball Skill Strategy Analyser
<p align="center">
  <img src="https://github.com/SawanoLab/VSSA/assets/55621861/c5594950-e975-4ada-9baa-431df902dde5" width="100" alt="Volleyball Skill Strategy Analyser Logo"><br>
</p>
<p align="center"><em>Empowering Volleyball Strategies with Cutting-Edge Analysis</em></p>

## User Interface Preview
<p align="center">
<kbd><img src="https://github.com/SawanoLab/VSSA/assets/55621861/b9e2a74c-a87b-4639-af7d-b28fa57a2c40" width="400" alt="Volleyball Skill Strategy Analyser - UI Snapshot"></kbd>
<kbd><img src="https://github.com/SawanoLab/VSSA/assets/55621861/53a7bc08-ec22-453d-93ea-82cbbb820270" width="400" alt="Volleyball Skill Strategy Analyser - UI Snapshot"></kbd>
</p>

## Setup Instructions
```
$ docker-compose up -d
$ npm isntall
$ npm start
```
Please rename .env.local.example to .env.local and fill in your AWS Cognito details.

## APIの処理は，openAPI-generatorで自動生成しています．
Our APIs are auto-generated using the openAPI-generator. Place openapi.json in the root directory and run docker-compose up -d to get started.

BackEnd link: https://github.com/SawanoLab/VSSA_backend
