import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from "next/legacy/image"
import { readdir } from 'fs/promises'
import path from 'path'
import React, { useState } from 'react'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import messageDictionary from '../assets/messages.json'
import Text from "../components/text"
import { Locale } from '../utilities/localeTypes'
import Footer from '../components/footer'

interface HomePageProps {
  files: string[],
}

const Home: NextPage<HomePageProps> = ({files}) => {
  const [descriptionShown, setDescriptionShown] = useState(false);

  const imageFile = files[Math.floor(Math.random() * files.length)]
  const image = (<Image src={`/images/${imageFile}`} alt="" width="1920" height="1080" layout="responsive" />)
  const router = useRouter()
  const clientLocale = router.locale || 'ja'
  const textLocale: Locale = clientLocale === 'ja' ? 'ja' : 'en'

  const messages = messageDictionary[textLocale]

  let buttonMessage = descriptionShown ? messages.buttonClose : messages.buttonMessage

  return (
    <div>
      <Head>
        <title>{messages.title}</title>
        <link rel="icon" href="/images/icon.png" />
      </Head>

      <Layout className="top md:relative">
        <div>
          {image}
        </div>
        <div className={descriptionShown ? "md-overlay-open" : "md-overlay"}>
          <header className="md:flex md:flex-row">
            <h1 className="text-2xl font-bold">{messages.title}</h1>
            <div className="hidden md:block md:flex-grow md:text-right md:justify-end">
              <button
                className="p-2 border border-red-600 bg-red-600 rounded mr-1"
                onClick={() => {setDescriptionShown(!descriptionShown)}}>
                {buttonMessage}
              </button>
              <button
                className="p-2 border border-gray-600 bg-white rounded"
                onClick={() => {router.push('/', '/', {locale: messages.oppositeLocale})}}>
                {messages.oppositeLang}
              </button>
            </div>
          </header>
          <Text className={descriptionShown ? "" : "md:hidden"} locale={textLocale} />
        </div>
        <Footer className="md-overlay-footer" style={descriptionShown ? {'display':'none'} : undefined} locale={textLocale} />
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const files = await readdir(path.join(process.cwd(), 'public', 'images'))
  const availableFiles = files.filter((file) => {
    return file.indexOf('beko') === 0
  })
  return {
    props: {
      files: availableFiles,
    },
    notFound: false,
  }
}
