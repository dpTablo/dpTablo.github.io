var store = [{
        "title": "electron + react 연동하기 with vscode",
        "excerpt":"electron 과 react 를 이용한 구현 기술 학습을 하던 중 직접 프로젝트를 설정해보았습니다. electron 이 구동하면서 react 의 페이지로 렌더링을 하고 이와 관련된 테스트, 디버깅을 vscode 에서 하는 것을 목표로 템플릿 프로젝트를 구성해보았습니다. 만든 템플릿 프로젝트는 Github 를 참조해주세요 ( https://github.com/dpTablo/electron-react-template ) 기존에 github 내에 있는 템플릿 프로젝트들은 보통 webpack...","categories": ["electron","react","vscode"],
        "tags": ["electron","react","vscode","project","template"],
        "url": "/electron/react/vscode/electron-react-vscode/",
        "teaser": null
      },{
        "title": "ELB (Elastic Load Balancer) 환경에서 nginx 의 http to https redirection",
        "excerpt":"아마존 AWS 의 SSL 을 사용하고 ELB(Elastic Load Balancer) 를 사용하고 있다면 일반적으로 아래와 같은 상황일 것입니다. http://[service domain] -&gt; ELB 80 port -&gt; EC2 80 port (nginx) -&gt; service application (8080 port) https://[service domain] -&gt; ELB 443 port -&gt; EC2 80 port (nginx) -&gt; service application (8080 port) 저의...","categories": ["AWS","nginx","http"],
        "tags": ["AWS","ELB","nginx","http","https","redirection"],
        "url": "/aws/nginx/http/elb-nginx-http-redirection/",
        "teaser": null
      },{
        "title": "Spring Boot + React + Gradle in VSCode",
        "excerpt":"Spring Boot + React + Gradle 프로젝트를 구성하고 VSCode 안에서 통합하여 개발하는 방법을 설명합니다. 설명 내용은 프리젠테이션 형식으로 준비해보았습니다. 일반적인 SPA (Single Page Application) 형태가 아닌 페이지단위로 react entry point 를 각각 분리하는 형태의 모델입니다. 이런 구성도 있구나 참고해주셨으면 좋겠습니다. Github 저장소에 코드를 공유합니다. https://github.com/dpTablo/springboot_react_gradle_in_vscode Spring Boot + React +...","categories": ["spring boot","react","gradle","vscode"],
        "tags": ["project template","spring boot","react","gradle","vscode"],
        "url": "/spring%20boot/react/gradle/vscode/spring-boot-react-gradle-in-vscode/",
        "teaser": null
      },{
        "title": "Gradle 프로젝트의 gradle 버전 변경",
        "excerpt":"프로젝트의 root 경로에서 아래 명령을 실행합니다. gradle 6.1.1로 지정한 예제입니다.   gradlew wrapper --gradle-version 6.1.1   console 창에서 수행한 결과 화면 입니다.      명령을 수행하고 나면 gradlew 파일이 변경되고, projectRoot/gradle/wrapper/gradle-wrapper.properties 의 내용이 변경됩니다.   distributionBase=GRADLE_USER_HOME distributionPath=wrapper/dists  distributionUrl=https\\://services.gradle.org/distributions/gradle-6.1.1-bin.zip  zipStoreBase=GRADLE_USER_HOME zipStorePath=wrapper/dists   ","categories": ["build","gradle"],
        "tags": ["gradle","wrapper","version"],
        "url": "/build/gradle/change-gradle-version-in-project/",
        "teaser": null
      }]
