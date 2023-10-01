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
    - [Axios](https://axios-http.com/vi/docs/intro)
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
├── redux                     #define all end point for api
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
├── services
│   ├── PokemonService.ts     #define all method to connect api of service
│   ├── ...
│   └── index.ts              #export all service
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
- @redux: ./src/redux
- @screens: ./src/screens
- @themes: ./src/themes
- @utils: ./src/utils
- @services: ./src/services
- @i18n: ./src/i18n

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
          |-----------------------------------------|-------------------|---------------|---------|
      | step                                    | `number`          |               | ✅       |
      | totalStep                               | `number`          |               | ✅       |
      | size                                    | `number`          |               | ✅       |
      | strokeWidth                             | `number`          | 10            |         |
      | totalStepColor                          | `string`          | `orange`      |         |
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
          |-----------------------------------------|-------------|---------------|---------|
      | step                                    | `number`    |               | ✅       |
      | totalStep                               | `number`    |               | ✅       |
      | strokeHeight                            | `number`    | 10            |         |
      | totalStepColor                          | `string`    | `orange`      |         |
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
          |----------------|----------------------------------------|---------------|---------|
      | colors         | `string[]`                             |               | ✅       |
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
          |----------------------------|-------------------|---------------|---------|
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

      | Name              | Type                    | Default value | Require |
          |-------------------|-------------------------|---------------|---------|
      | buttonWidth       | `number` or `string`    | 5             |         |
      | buttonHeight      | `number` or `string`    | `#ccc`        |         |
      | buttonBorderSize  | `number`                | `undefined`   |         |
      | buttonBorderColor | `string` or `ReactNode` | `undefined`   |         |
      | containerStyle    | `ViewStyle`             | `undefined`   |         |
      | shadowHeight      | `number`                | 5             |         |
      | buttonRadius      | `number`                | 5             |         |
      | buttonColor       | `string`                | `primary`     |         |
      | disabled          | `boolean`               | `undefined`   |         |
      | shadowButtonColor | `string`                | `greyLight`   |         |

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
        onPress={() => {
          console.log('press')
        }}
      />
      ```

- ModalProvider

    - **Props**

      | Name              | Type                          | Default value      | Require |
          |-------------------|-------------------------------|--------------------|---------|
      | children          | `ReactNode`                   | `auto produce`     | ✅       |
      | position          | `top` or `bottom` or `center` | `bottom`           |         |
      | modalHeight       | `number`                      | 279                |         |
      | animationType     | `fade` or `slide`             | `fade`             |         |
      | modalComponent    | `ReactNode`                   | `undefined`        |         |
      | backDropComponent | `ReactNode`                   | `Default backdrop` |         |
      | labelColor        | `string`                      | `white`            |         |
      | onShow            | `void function`               | `undefined`        |         |
      | onDismiss         | `void function`               | `undefined`        |         |

    - **How to use**
    - Wrap the component as a container to use

  ```javascript
  const ref = useRef(null)
  const modalRef = useRef<ModalProviderFunction>(null)
  const handleOpen = useCallback(() => {
  modalRef.current?.openModal()
  }, [])
  const handleDismiss = useCallback(() => {
  modalRef.current?.dismissModal()
  }, [])
  const onShow = useCallback(() => {
  console.log('Modal opened')
  }, [])
  const onDissmiss = useCallback(() => {
  console.log('Modal closed')
  }, [])
  return (
  <ModalProvider
    ref={modalRef}
    position="bottom"
    animationType="fade"
    onShow={onShow}
    onDismiss={onDissmiss}
    modalComponent={
      <Block flex alignCenter justifyCenter radius={15}>
        <Pressable
          style={{ backgroundColor: 'red', padding: 50 }}
          onPress={handleDismiss}
        >
          <Text>Press me</Text>
        </Pressable>
      </Block>
    }
  >
   your code here
  </ModalProvider>
  ```

- LineChart

    - **Props**

      | Name                 | Type             | Default value | Require |
          |----------------------|------------------|---------------|---------|
      | data                 | `Array`          | `undefined`   | ✅       |
      | width                | `number`         | `undefined`   | ✅       |
      | height               | `number`         | `undefined`   | ✅       |
      | precision            | `number`         | 0             |         |
      | haveVerticalGuides   | `boolean`        | `false`       |         |
      | haveHorizontalGuides | `boolean`        | `false`       |         |
      | haveXAxis            | `boolean`        | `false`       |         |
      | haveYAxis            | `boolean`        | `false`       |         |
      | axisStrokeWidth      | `number`         | 0.5           |         |
      | axisStrokeColor      | `string`         | `#E5E5E5`     |         |
      | haveDots             | `boolean`        | `false`       |         |
      | dotsColor            | `string`         | `##FFC107`    |         |
      | dotsStrokeColor      | `string`         | `#FFFFFF`     |         |
      | dotsStrokeWidth      | `number`         | 2             |         |
      | rDots                | `number`         | 8             |         |
      | labelColor           | `string`         | `#171725`     |         |
      | labelFontSize        | `string`         | `h5`          |         |
      | labelFontFamily      | `string`         | `semibold`    |         |
      | lineColor            | `string`         | `#FFEFAD`     |         |
      | lineWidth            | `number`         | 2             |         |
      | onItemClick          | `void functioin` | `undefined`   |         |

    - **How to use**
    - Line chart will be changed based on the data provided

  ```javascript
  const data = [
    { id: 0, label: 'Mon', x: 0, y: 0 },
    { id: 1, label: 'Tues', x: 1, y: 4 },
    { id: 2, label: 'Wed', x: 2, y: 30 },
    { id: 3, label: 'Thur', x: 3, y: 15 },
    { id: 4, label: 'Fri', x: 4, y: 40 },
    { id: 5, label: 'Sat', x: 5, y: 50 },
    { id: 6, label: 'Sun', x: 6, y: 40 },
  ]
  <LineChart
    width={widthScreen}
    height={300}
    data={data}
    haveDots
    haveXAxis
    haveHorizontalGuides
    lineColor="#FFEFAD"
    onItemClick={handleItemClick}
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

## How to create new `Flow`

1. Go to `screens` folder and define new component
2. Config the `screen` name route at `src/navigation/routes`
3. Config the new screen route at `src/navigation/RootStack`

## How to use Rive Animation ?

- Official [document](https://help.rive.app/runtimes/overview/react-native) from Rive

**From [Youth-Tech](https://github.com/Youth-Tech) with 💖**
