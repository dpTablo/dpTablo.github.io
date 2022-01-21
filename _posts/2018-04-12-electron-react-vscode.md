---
title:  "electron + react 연동하기 with vscode"
excerpt: ""
author_profile: true
date: 2018-04-12 19:01:00 +0900
last_modified_at: 2021-01-21 19:13:00 +0900

categories:
- electron
- react
- vscode

tags: [electron, react, vscode, project, template]
---

electron 과 react 를 이용한 구현 기술 학습을 하던 중 직접 프로젝트를 설정해보았습니다.
electron 이 구동하면서 react 의 페이지로 렌더링을 하고 이와 관련된 테스트, 디버깅을 vscode 에서 하는 것을 목표로 템플릿 프로젝트를 구성해보았습니다.
만든 템플릿 프로젝트는 Github 를 참조해주세요  ( https://github.com/dpTablo/electron-react-template )


기존에 github 내에 있는 템플릿 프로젝트들은 보통 webpack 버전 2 또는 3 계열이 많았습니다.
제가 이 템플릿을 작성하는 시점에서 webpack 최신버전은 4.5.0 이었습니다.
가급적 최신버전으로 적용해보고자 하는 의도로 react, electron 등 주요 모듈들을 최신 버전으로 구성했습니다.


webpack 4.x 로 오면서 opmization 부분들이 3.x 에서는 플러그인 형태로 적용되었으나, development 모드일 때 대다수의 최적화 항목들이 적용되는 것으로 변경되었습니다. (webpack 개발문서 중 mode 부분 참조 : https://webpack.js.org/concepts/mode/#src/components/Sidebar/Sidebar.jsx)

아래는 설치한 모듈 목록 입니다.
electron 과 react 를 비롯하여 webpack, sass, babel, eslint 등을 적용하였습니다.
react 테스트를 위해 webpack-dev-server 를 적용하였습니다.

```node
{
    "name": "dptablo-electron-react",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {},
    "config": {},
    "dependencies": {
        "electron": "^1.8.4",
        "react": "^16.3.1",
        "react-dom": "^16.3.1"
    },
    "devDependencies": {
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.4",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "copy-webpack-plugin": "^4.5.1",
        "css-loader": "^0.28.2018-04-12-electron-react-vscode",
        "eslint": "^4.19.1",
        "eslint-plugin-react": "^7.7.0",
        "file-loader": "^1.1.2018-04-12-electron-react-vscode",
        "html-webpack-plugin": "^3.2.0",
        "node-sass": "^4.8.3",
        "react": "^16.3.1",
        "react-dom": "^16.3.1",
        "react-hot-loader": "^4.0.1",
        "sass-loader": "^6.0.7",
        "source-map-loader": "^0.2.3",
        "style-loader": "^0.20.3",
        "url-loader": "^1.0.1",
        "webpack": "^4.5.0",
        "webpack-cli": "^2.0.14",
        "webpack-dev-server": "^3.1.1"
    }
}
```

electron 의 진입 코드는 main.js 입니다.
webpack 빌드 경로를 /dist 로 설정하여 해당 경로의 index.html 를 지정합니다.

```javascript
window.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
}))
```

index.html 에는 react 가 변환된 bundle.js 만 포함합니다.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>React</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="bundle.js"></script>
    </body>
</html>
```

vscode 에서 'webpack-dev-server' task 를 실행합니다.  
해당 task 를 실행하면 자동으로 빌드되어 /dist 로 배포되고 테스트용 로컬 웹서버가 기동됩니다.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/_posts/20180412/01.png)

브라우저를 통해 접속하시면 아래와 같은 화면을 볼 수 있습니다.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/_posts/20180412/02.png)


크롬 브라우저를 --remote-debugging-port 옵션에 9222 번으로 지정하여 실행합니다.
vscode 에서 App.jsx 의 render 함수 부분에 break point 를 설정하고 'attach webpack-dev-server' 를 디버그로 실행합니다.
그리고 크롬에서 페이지를 새로고침하면 아래처럼 vscode 단에서 디버깅을 하실 수 있습니다.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/_posts/20180412/03.png)

react 로직이 구현된 파일은 확장자를 .jsx 를 사용하였고, 스타일을 동일한 이름의 .scss 파일로 정의해두었습니다.
저도 기존에 프론트엔드를 접하지 않았었고 아직 기초적인 설정을 적용했다고 생각합니다.
여기까지 진행하면서 electron 과 react 를 한번에 디버그를 진행할 수 없는 문제가 있습니다.
electron 의 디버그는 'Launch electron' 으로 구동 해야 합니다.