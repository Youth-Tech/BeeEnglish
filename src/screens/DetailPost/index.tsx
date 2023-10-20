import React from 'react'
import HeaderApp from '@components/common/HeaderComponent'
import { Block, Container, Image, Text } from '@components'
import { useTheme } from '@themes'
import { useStyles } from './styles'
import ContentPost from '@screens/DetailPost/components/ContentPost'
import { FlatList, ScrollView } from 'react-native'
import { posts } from '@screens/DetailPost/const'
import {useTranslation} from "react-i18next";

const DetailPost: React.FC = () => {
  const { colors } = useTheme()
  const styles = useStyles(colors)
  const {t} = useTranslation();
  return (
    <Container style={styles.container}>
      <HeaderApp title={t('detail_post_header')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.boxImagePost}>
          <Image
            source={{
              uri: 'https://www.usatoday.com/gcdn/authoring/authoring-images/2023/09/06/USAT/70779211007-xxx-motions-ba-040-4181316.JPG?width=660&height=441&fit=crop&format=pjpg&auto=webp',
            }}
            style={styles.image}
          />
          <Block style={styles.boxTitle}>
            <Text style={styles.title} size={'h3'} fontFamily={'bold'}>
              Luyện kỹ năng đọc hiểu
            </Text>
          </Block>
        </Block>
        <FlatList
            style={styles.listParagraph}
          scrollEnabled={false}
          data={posts}
          renderItem={({ item }) => <ContentPost data={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </Container>
  )
}

export default DetailPost
