import style from './Footer.module.css';
import { AiFillGithub, AiOutlineWhatsApp, AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {

    return (
        <>
            <div className={style.footerBox}>
                <div className={style.listSocialMedias}>
                    <AiFillGithub className={style.iconSocialMedia} />
                    <AiFillLinkedin className={style.iconSocialMedia} />
                    <AiOutlineWhatsApp className={style.iconSocialMedia} />
                </div>
            </div>

        </>
    )
}

export default Footer;