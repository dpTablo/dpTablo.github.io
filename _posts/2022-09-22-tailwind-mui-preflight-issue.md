---
title:  "tailwind preflight 에 의한 border style 이슈"
excerpt: "tailwind preflight 설정이 변경됨에 따른 style 이슈를 관한 내용"
author_profile: true
date: 2022-09-22 11:36:00 +0900
last_modified_at: 2022-09-22 11:36:00 +0900

categories:
- frontend
- react
- nextjs
- typescript
- tailwind
- mui
- meterial-ui
- preflight

tags: [frontend, react, nextjs, typescript, tailwind, mui, meterial-ui, preflight]
---

react 환경에서 tailwindCSS 와 mui(meterial-ui)를 혼용하여 사용하는 경우에 대한 border style 이 올바르게 적용되지 않는 이슈가 발생하였습니다. 
preflight에 올바르게 이해하지 않고 사용하려다 보니 문제가 발생하였고 이에 대한 내용을 정리하였습니다. 

# 상황

1. tailwind 와 mui 를 동시에 사용하기 위한 설정 가이드 문서에 의해 tailwind preflight 를 비활성화 하였다.(tailwind.config.js)
2. 원래 tailwind 의 preflight 스타일에는 아래와 같은 기본값이 적용된다.

    ```css
    *,
    ::before,
    ::after {
      border-width: 0;
      border-style: solid;
      border-color: theme('borderColor.DEFAULT', currentColor);
    }
    ```

3. 1번에 의해 비활성화 되면서 2번의 스타일이 적용되지 않음에 따라 최종 렌더링에서 border-width 값이 0으로 확정된다.

   border-style 이 none 으로 적용되기 때문이다.

4. 대부분의 html element 들에 border 가 올바르게 적용되지 않는 현상이 발생한다.

# 해결방법

tailwind preflight 문서 ([https://tailwindcss.com/docs/preflight](https://tailwindcss.com/docs/preflight)) 의 ‘Extending Preflight’ 부분을 참고하여 기본적인 border 관련 스타일을 지정하였다.

```css
@tailwind base;
@layer base {
    *,
    ::before,
    ::after {
        border-width: 0;
        border-style: solid;
    }
}
```

# 예상되는 문제

preflight 을 활성화 하면 mui 의 기본적인 스타일이 틀어지게 된다.

preflight 를 비활성화 하면 기본적인 tailwind 의 스타일이 적용되지 않음에 따라 tailwind 를 적용한 스타일의 렌더링이 의도한 대로 되지 않을 수 있다. 이를 해결하기 위해서 `@layer base` 를 통해 스타일을 지정하기 시작하면 결국 preflight 가 활성화 되었을 때의 문제점이 발생할 수 있다.

# mui Button 에 border 가 적용되지 않는 현상에 대하여

css 적용 우선순위는 아래와 같다. 뒤에 나열된 스타일이 우선권을 가진다.

1. global.scss
2. tailwind `@layer base`
3. mui 기본 스타일 (border-style 이 outline 으로 된다.)

따라서 mui Button 에 tailwind 의 `border-4` 와 같은 스타일을 적용하여도 2번에서 적용된 border-style solid 값이 오버라이드 되어 outline 으로 되어 렌더링 되지 않게 된다.

# 참고문서

[https://tailwindcss.com/docs/preflight](https://tailwindcss.com/docs/preflight)