# Bee English

## Contents

1. [Technical](#technical)
2. [Project Scaffolding](#project-scaffolding)
3. [Alias](#alias)
4. [Core Component](#core-component)
5. [Custom Component](#custom-component)
6. [🚀 Getting Started](#🚀-getting-started)
7. [How to create new Service](#how-to-create-new-api-service)
8. [How to create new Flow](#how-to-create-new-flow)
9. [How to use Rive Animation](#how-to-use-rive-animation)

## Technical

- Package Management: [Yarn](https://yarnpkg.com/)
- State Management
  - [Redux](https://redux-toolkit.js.org/introduction/getting-started)
- Routing and Navigation
  - [React Navigation](https://reactnavigation.org/docs/getting-started) for native mobile
- Connect API
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/usage/queries) of Redux Toolkit
- Local Storage
  - [MMKV](https://github.com/mrousavy/react-native-mmkv) for React Native
  - [Redux Persist](https://github.com/rt2zz/redux-persist)
- Animation Handler
  - [Reanimated3](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
  - [React Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
  - [React Native Animated API](https://reactnative.dev/docs/animated)
  - [Rive](https://help.rive.app/runtimes/overview/react-native) for React Native

## Project Scaffolding

```bash
src
├── @type                     #define commons type use in project
├── assets                    #contain file image, svg, animation config, ... in project
│
├── components
│   ├── bases                 #define base component for project
│   ├── commons               #define custom component for project
│   └── utils                 #define utils for component
│
├── hooks                     #define custom hook
├── navigation
│   ├── index.ts              #export all method, variable, and components
│   ├── routes.ts             #define all screen route in project
│   ├── RootStack.tsx         #contain all stack in project
│   ├── RootApp.tsx           #contain RootStack, loading modal, message modal
│   └── NavigationService.ts  #define 'navigationRef' and all method to interact with it
│
├── reduxs
│   ├── apis
│   │   ├── services          #define all method fetching data in project
│   │   │   ├── pokemon.ts
│   │   │   └── index.tsx     #export all service
│   │   ├── apiService.ts     #define common method to call api with re-auth
│   │   └── endPoints.ts      #define all end point for api
│   ├── reducers              #define all reducer in project
│   ├── store                 #define store for project with Redux Persist - MMKV storage
│   └── selectors             #define all selector in project
│
├── screens
│   ├── HomeScreen
│   │   ├── components        #define common component for screen
│   │   ├── index.tsx         #define and export screen component
│   │   └── type.ts           #define common type for screen
│   ├── ...
│   └── index.ts              #export all screen
│
├── themes
│   ├── baseStyles.ts         #define base style for style sheet create by method 'makeStyles'
│   ├── colors.ts             #define color palette
│   ├── font.ts               #define font, fontSize in project
│   ├── normalize.ts          #define responsive method
│   ├── style.ts              #define utils, type, hook for style of project theme
│   └── index.ts              #export all theme method and constants
│
├── utils
│   ├── ...
│   └── helper.ts             #define helper function for project
│
└── App.tsx
```

## Alias

- @type: ./src/@type
- @assets: ./src/assets
- @components: ./src/components
- @hooks: ./src/hooks
- @navigation: ./src/navigation
- @reduxs: ./src/reduxs
- @screens: ./src/screens
- @themes: ./src/themes
- @utils: ./src/utils

## Core Component

- Container
- Block
- Text
- TextInput
- Image
- StatusBar

## Custom Component

- Circle Progress

  - **Props**

    | Name                                    | Type              | Default value | Require |
    | --------------------------------------- | ----------------- | ------------- | ------- |
    | step                                    | `number`          |               | ✅      |
    | totalStep                               | `number`          |               | ✅      |
    | size                                    | `number`          |               | ✅      |
    | strokeWidth                             | `number`          | 10            |         |
    | totalStepColor                          | `string`          | `primary`     |         |
    | stepColor                               | `string`          | `greyLight`   |         |
    | progressContainerStyles                 | `ViewStyle`       | `{}`          |         |
    | progressValueProps                      | `CommonTextProps` | `undefined`   |         |
    | onCompleteAnimation(isFinish?: boolean) | `Function`        | `()=>{}`      |         |

  - **How to use**

    ```javascript
    <CircleProgress size={150} step={50} totalSteps={100} strokeWidth={10} />
    ```

- Progress

  - **Props**

    | Name                                    | Type        | Default value | Require |
    | --------------------------------------- | ----------- | ------------- | ------- |
    | step                                    | `number`    |               | ✅      |
    | totalStep                               | `number`    |               | ✅      |
    | strokeHeight                            | `number`    | 10            |         |
    | totalStepColor                          | `string`    | `primary`     |         |
    | stepColor                               | `string`    | `greyLight`   |         |
    | progressContainerStyles                 | `ViewStyle` | `{}`          |         |
    | onCompleteAnimation(isFinish?: boolean) | `Function`  | `()=>{}`      |         |

  - **How to use**

    ```javascript
    <Progress
      strokeHeight={10}
      step={80}
      totalSteps={100}
      progressContainerStyles={{
        paddingHorizontal: 10,
      }}
    />
    ```

- LinearGradient

  - **Props**

    | Name           | Type                                   | Default value | Require |
    | -------------- | -------------------------------------- | ------------- | ------- |
    | colors         | `string[]`                             |               | ✅      |
    | containerStyle | `ViewStyle`                            | `{}`          |         |
    | orientation    | `horizontal` or `vertical` or `number` | `vertical`    |         |
    | revers         | `boolean`                              | `false`       |         |
    | transform      | `Partial<TransformedProps>`            | `{}`          |         |

  - **How to use**

    ```javascript
    <LinearGradient
      colors={['#FFEFAD', '#FFC107']}
      containerStyle={{ flex: 1 }}
      transform={{ rotation: 20 }}
    />
    ```

- ShadowBlock

  - **Props**

    - **Component is extended all props from `Block` component**
    - **External Props**

    | Name                       | Type              | Default value | Require |
    | -------------------------- | ----------------- | ------------- | ------- |
    | shadowHeight               | `number`          | 5             |         |
    | shadowPosition             | `top` or `bottom` | `bottom`      |         |
    | shadowLabel                | `string`          | `undefined`   |         |
    | shadowLabelTextStyle       | `CommonTextProps` | `undefined`   |         |
    | shadowLabelContainerStyle  | `BlockProps`      | `undefined`   |         |
    | shadowBackgroundColor      | `string`          | `#ccc`        |         |
    | containerPaddingVertical   | `number`          | `undefined`   |         |
    | containerPaddingHorizontal | `number`          | `undefined`   |         |
    | containerPaddingRight      | `number`          | `undefined`   |         |
    | containerPaddingLeft       | `number`          | `undefined`   |         |
    | containerPaddingTop        | `number`          | `undefined`   |         |
    | containerPaddingBottom     | `number`          | `undefined`   |         |

  - **How to use**

    ```javascript
    <ShadowBlock
      row
      marginTop={20}
      space="between"
      paddingHorizontal={20}
      containerPaddingHorizontal={20}
    >
      <Block width={10} height={10} backgroundColor="red" />
      <Progress
        step={10}
        totalSteps={100}
        strokeHeight={10}
        progressContainerStyles={{
          flex: 1,
          marginStart: 10,
        }}
      />
    </ShadowBlock>
    ```

- ShadowButton

  - **Props**

    - **Component is extended all props from `Pressable` (native component from ReactNative) component**
    - **External Props**

    | Name              | Type                                         | Default value | Require |
    | ----------------- | -------------------------------------------- | ------------- | ------- |
    | buttonWidth       | `number` or `string`                         | 5             |         |
    | buttonHeight      | `number` or `string`                         | `#ccc`        |         |
    | buttonBorderSize  | `number`                                     | `undefined`   |         |
    | buttonBorderColor | `string` or `ReactNode`                      | `undefined`   |         |
    | containerStyle    | `ViewStyle`                                  | `undefined`   |         |
    | labelSize         | `FontKeys` or `number`                       | `undefined`   |         |
    | labelColor        | `string`                                     | `white`       |         |
    | fontFamily        | `bold` or `semiBold` or `regular` or `light` | `regular`     |         |
    | labelStyle        | `TextStyle`                                  | `undefined`   |         |
    | shadowHeight      | `number`                                     | 5             |         |
    | buttonRadius      | `number`                                     | 5             |         |
    | buttonColor       | `string`                                     | `primary`     |         |
    | disabled          | `boolean`                                    | `undefined`   |         |
    | shadowButtonColor | `string`                                     | `greyLight`   |         |

  - **How to use**

    ```javascript
    <ShadowButton
      buttonHeight={45}
      buttonBorderSize={2}
      buttonBorderColor={
        <Block style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['#FFEFAD', '#FFC107']}
            containerStyle={{ width: '100%', height: '100%' }}
          />
        </Block>
      }
      shadowHeight={10}
      buttonRadius={8}
      shadowButtonColor="#FFC107"
      buttonColor="#FFEFAD"
      labelSize={'h2'}
      fontFamily="bold"
      labelColor="primaryText"
      onPress={() => {
        console.log('press')
      }}
    />
    ```

## 🚀 Getting Started

### 1. Installation

```bash
yarn install

# To build iOS app

cd ios
pod install
cd ..
```

### 2. Run Android

```bash
yarn android
```

### 3. Run IOS

```bash
yarn ios
```

c

## How to create new `Api Service`

1. Go to `service` folder at `src/reduxs/apis` and define new `service`

   **Example**

```javascript
import { apiService } from './apiService'
import { EndPoint } from './endPoint'
import {
  GetAllVideoResponse,
  GetVideoResponse,
  QueryArgs,
  Video,
  RelatedVideosRequest,
} from './type'

export const videoService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllVideo: builder.query<GetAllVideoResponse, void>({
            query: () => EndPoint.getAllVideo,
            keepUnusedDataFor: 10,
        }),
        getRelatedVideos: builder.query<Video[], RelatedVideosRequest>({
            query: (input) => {
              return {
                url: EndPoint.getAllVideo,
                params: input,
              }
            },
            keepUnusedDataFor: 10,
            transformResponse: (response: any) => response.data,
        }),
        getVideo: builder.query<GetVideoResponse, string>({
            query: (id) => EndPoint.getVideoById(id),
            keepUnusedDataFor: 10,
        }),
        geVideoPagination: builder.query<GetAllVideoResponse, QueryArgs>({
            query: (args) => {
              return {
                url: EndPoint.getAllVideo,
                params: args,
              }
            },
            keepUnusedDataFor: 10,
          }),
    }),
})

export const {
    useGetAllVideoQuery,
    useGetVideoQuery,
    useLazyGetRelatedVideosQuery,
    useLazyGeVideoPaginationQuery,
    useGeVideoPaginationQuery
} = videoService
```

2. After that, go to `index.ts` file at `src/reduxs/apis/service` and export your `service`

## How to create new `Flow`

1. Go to `screens` folder and define new component
2. Config the `screen` name route at `src/navigation/routes`
3. Config the new screen route at `src/navigation/RootStack`

## How to use Rive Animation ?

- Official [document](https://help.rive.app/runtimes/overview/react-native) from Rive

**From [Youth-Tech](https://github.com/Youth-Tech) with 💖**
