---
title:  "Gradle 프로젝트의 gradle 버전 변경"
excerpt: "gradle wrapper 의 version을 변경하는 방법"
author: dpTablo
thumbnail: /assets/images/_posts/2020-01-29-change-gradle-version-in-project/gradle_version_capture.png


categories:
- build
- gradle

tags: [gradle, wrapper, version]

date: 2020-01-29 10:07:00 +0900
last_modified_at: 2019-04-13T08:06:00-05:00
---

프로젝트의 root 경로에서 아래 명령을 실행합니다. gradle 6.1.1로 지정한 예제입니다.

```bash
gradlew wrapper --gradle-version 6.1.1
```

console 창에서 수행한 결과 화면 입니다.

![](/assets/images/_posts/2020-01-29-change-gradle-version-in-project/gradle_version_capture.png)

명령을 수행하고 나면 gradlew 파일이 변경되고, projectRoot/gradle/wrapper/gradle-wrapper.properties 의 내용이 변경됩니다.

```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists 
distributionUrl=https\://services.gradle.org/distributions/gradle-6.1.1-bin.zip 
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

