---
title:  "nextjs 12, react 18, mui 사용 환경에서의 eslint 에러 TS2322 관련 사항"
excerpt: "nextjs 12, react 18, mui 사용 환경에서의 eslint 에러 TS2322 관련 사항"
author_profile: true
date: 2023-03-24 09:33 +0900
last_modified_at: 2023-03-24 09:33 +0900

categories:
- frontend
- nextjs
- mui
- eslint

tags: [frontend, nextjs, react, mui, material-ui, eslint, typescript, ts2322,]
---

# 문제사항

nextjs, typescript 프로젝트 환경에서 MUI 를 사용할 때 eslint 에서 아래와 같은 에러가 감지된다.mui의 `GridActionsCellItem` 를 선언한 경우에 위에 에러가 발생했다.

> `Type '{ icon: Element; className?: string; style?: CSSProperties; label: string; slot?: string; title?: string; defaultChecked?: boolean; defaultValue?: string | number | readonly string[]; ... 276 more ...; type?: "button" | ... 1 more ... | "reset"; } | { ...; }' is not assignable to type 'IntrinsicAttributes & ((Pick<{ label: string; icon?: ReactElement<any, string | JSXElementConstructor<any>>; } & ... 4 more ... & Omit<...>, "name" | ... 280 more ... | "showInMenu"> | Pick<...>) & RefAttributes<...>)'. Type '{ icon: Element; className?: string; style?: CSSProperties; label: string; slot?: string; title?: string; defaultChecked?: boolean; defaultValue?: string | number | readonly string[]; ... 269 more ...; onTransitionEndCapture?: TransitionEventHandler<...>; }' is not assignable to type 'IntrinsicAttributes & ((Pick<{ label: string; icon?: ReactElement<any, string | JSXElementConstructor<any>>; } & ... 4 more ... & Omit<...>, "name" | ... 280 more ... | "showInMenu"> | Pick<...>) & RefAttributes<...>)'. Type '{ icon: Element; className?: string; style?: CSSProperties; label: string; slot?: string; title?: string; defaultChecked?: boolean; defaultValue?: string | number | readonly string[]; ... 269 more ...; onTransitionEndCapture?: TransitionEventHandler<...>; }' is not assignable to type 'RefAttributes<HTMLButtonElement>'. Types of property 'ref' are incompatible. Type '(Ref<HTMLButtonElement> | Ref<HTMLLIElement>) & Ref<HTMLLIElement>' is not assignable to type 'Ref<HTMLButtonElement>'. Type '(instance: HTMLLIElement) => void' is not assignable to type 'Ref<HTMLButtonElement>'. Type '(instance: HTMLLIElement) => void' is not assignable to type '(instance: HTMLButtonElement) => void'. Types of parameters 'instance' and 'instance' are incompatible. Type 'HTMLButtonElement' is not assignable to type 'HTMLLIElement'. Types of property 'value' are incompatible. Type 'string' is not assignable to type 'number'.ts(2322`
>

프로젝트의 주요 의존성은 아래와 같다.

- react 18.2.0
- next 12.3.4
- mui 5.17.26
- mui/x-data-grid 5.17.26

# MUI github issue 내용

mui 프로젝트에 이슈로 관련 내용이 등록되어 있다. ([https://github.com/mui/mui-x/issues/5239](https://github.com/mui/mui-x/issues/5239))

2022년 12월경까지 계속 문제가 발생되고 있었으며 내가 테스트 해본 시점은 2023년 3월말 시점이다.

# 해결방안

해당 이슈가 개선되지 않은것으로 보이며 다른 이슈에 해결방안에 대한 답변이 있다.

[https://github.com/mui/material-ui/issues/35287#issuecomment-1337250566](https://github.com/mui/material-ui/issues/35287#issuecomment-1337250566)

@types/react@17 과 @types/react@18의 타입 불일치로 인한 문제로 추정된다고 하며 2023년 3월말인 지금 시점에서도 해당 문제는 개선되지 않았다. 따라서 프로젝트에 보강 코드를 작성하여 이 문제를 해결하고 있다.

```jsx
declare global {
    namespace React {
        interface DOMAttributes<T> {
            onResize?: ReactEventHandler<T> | undefined;
            onResizeCapture?: ReactEventHandler<T> | undefined;
            nonce?: string | undefined;
        }
    }
}
```

근본적인 해결책은 아니며 개선이 될 때까지 위와 같은 보강코드를 사용해야 한다. 보강코드는 document.page.tsx 에 적용하여 전체 페이지에 적용되도록 처리하였다.