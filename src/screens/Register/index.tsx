import { StyleSheet, Pressable, DocumentSelectionState } from 'react-native'
import React from 'react'
import {
    Block,
    Container,
    DismissKeyBoardBlock,
    ShadowButton,
    Text,
    TextInput,
} from '@components'
import { BackArrow } from '@assets'
import { goBack, navigate } from '@navigation'
import { useTheme } from '@themes'
import { useTranslation } from 'react-i18next'
import { Google, Facebook } from '@assets'

type Props = {}
interface SocialLoginButtonProps {
    name: string
    icon: 'google' | 'facebook'
    onPress?: () => void
}
const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
    name,
    icon,
    onPress,
}) => {
    const { colors, normalize } = useTheme()
    const renderIcon = () => {
        switch (icon) {
            case 'google':
                return <Google />
                break
            case 'facebook':
                return <Facebook />
                break
        }
    }
    return (
        <Pressable
            style={{
                width: normalize.h(139.26),
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 3,
                backgroundColor: colors.white,
                borderRadius: normalize.m(27.41),
                paddingVertical: normalize.v(10),
                justifyContent: 'center',
                marginTop: normalize.v(18),
            }}
            onPress={onPress}
        >
            {renderIcon()}
            <Text size={'h4'} fontFamily="bold" color={colors.black} paddingLeft={10}>
                {name}
            </Text>
        </Pressable>
    )
}
export const Register = (props: Props) => {
    const { colors, normalize } = useTheme()
    const { t } = useTranslation()
    const [name, setname] = React.useState('')
    const [email, setemail] = React.useState('')
    const [password, setpassword] = React.useState('')

    const name_inputRef = React.useRef<DocumentSelectionState>()
    const email_inputRef = React.useRef<DocumentSelectionState>()
    const password_inputRef = React.useRef<DocumentSelectionState>()

    const onSubmit = () => {
        console.log('handleSubmit')
    }
    const goLogin = () => {
        navigate('LOGIN_SCREEN')
    }
    const handleLoginGoogle = () => { }
    const handleLoginFacebook = () => { }
    return (
        <Container>
            <DismissKeyBoardBlock>
                <Block flex paddingHorizontal={24} paddingTop={10} space="between">
                    <Block>
                        <BackArrow fill={'black'} onPress={goBack} />
                        <Text
                            color={colors.black}
                            size={'heading'}
                            fontFamily="bold"
                            marginTop={20}
                        >
                            {t('sign_up')}
                        </Text>
                        <Block marginTop={25}>
                            <TextInput
                                label={t('fullname')}
                                placeholder={t('fullname_placeholder')}
                                onChangeText={setname}
                                value={name}
                                returnKeyType="next"
                                onSubmitEditing={() => email_inputRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        </Block>
                        <Block marginTop={25}>
                            <TextInput
                                ref={email_inputRef}
                                label={'E-mail'}
                                placeholder="example@gmail.com"
                                onChangeText={setemail}
                                value={email}
                                returnKeyType="next"
                                onSubmitEditing={() => password_inputRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                        </Block>
                        <Block marginTop={25}>
                            <TextInput
                                ref={password_inputRef}
                                label={t('password')}
                                placeholder="•••••••••••••"
                                onChangeText={setpassword}
                                value={password}
                                secureTextEntry
                            />
                        </Block>

                        <ShadowButton
                            onPress={onSubmit}
                            buttonHeight={45}
                            buttonWidth={194}
                            buttonRadius={10}
                            shadowButtonColor={colors.orangeLighter}
                            buttonColor={colors.orangePrimary}
                            shadowHeight={7}
                            containerStyle={{
                                alignSelf: 'center',
                                marginTop: normalize.v(57.4),
                            }}
                        >
                            <Text color="white" fontFamily="bold" size={'h3'}>
                                {t('sign_up')}
                            </Text>
                        </ShadowButton>

                        <Block row marginTop={25} justifyCenter alignCenter>
                            <Text size={'h4'} fontFamily="bold" color={colors.greyPrimary}>
                                {t('have_account')}?
                            </Text>
                            <Pressable
                                onPress={goLogin}
                                style={{ marginStart: normalize.h(3) }}
                            >
                                <Text size={'h4'} fontFamily="bold" color={colors.orangeDark}>
                                    {t('login')}
                                </Text>
                            </Pressable>
                        </Block>
                    </Block>
                    <Block>
                        <Block row alignCenter>
                            <Block height={1} backgroundColor={colors.greyLighter} flex />
                            <Text
                                size={'h4'}
                                fontFamily="bold"
                                color={colors.greyPrimary}
                                marginHorizontal={5}
                            >
                                {t('login_with')}
                            </Text>
                            <Block height={1} backgroundColor={colors.greyLighter} flex />
                        </Block>
                        <Block marginBottom={16} row space="between">
                            <SocialLoginButton
                                name="Google"
                                icon="google"
                                onPress={handleLoginGoogle}
                            />
                            <SocialLoginButton
                                name="Facebook"
                                icon="facebook"
                                onPress={handleLoginFacebook}
                            />
                        </Block>
                    </Block>
                </Block>
            </DismissKeyBoardBlock>
        </Container>
    )
}

const styles = StyleSheet.create({})
