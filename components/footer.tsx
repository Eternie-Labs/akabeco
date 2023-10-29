import React, { CSSProperties } from "react"
import classNames from "../utilities/classNames"
import messageDictionary from '../assets/messages.json'
import { Locale } from "../utilities/localeTypes"
import Image from "next/legacy/image"

interface FooterParams {
    className: string
    locale: Locale
    style?: CSSProperties
}

const Footer: React.FC<FooterParams> = ({className, style, locale}) => {
    const setClass = classNames(
        'md:flex',
        'md:flex-row',
        className
    )

    const { privacyPolicy, creativeCommons } = messageDictionary[locale]

    return (
      <div className={setClass} style={style}>
        <div className="md:flex-grow">
          <div className="md:inline">
            <a href="https://kuropen.org/" className="underline" target="_blank" rel="noopener noreferrer">Copyright (C) Kuropen</a>.
            Hosted by <a href="https://www.eternie-labs.net/" className="underline" target="_blank" rel="noopener noreferrer">Eternie Labs</a>.
          </div>
          <div className="md:inline md:ml-1">
            <a href="https://penguinone.kuropen.org/privacy" className="underline" target="_blank" rel="noopener noreferrer">{privacyPolicy}</a>
          </div>
        </div>
        <div className="md:text-right md:justify-end">
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><Image alt={creativeCommons} src="https://i.creativecommons.org/l/by/4.0/88x31.png" width={88} height={31} /></a>
        </div>
      </div>
    )
}

export default Footer