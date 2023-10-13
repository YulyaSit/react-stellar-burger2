import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './AppHeader.module.css'
function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.navigation}>
                <ul className={headerStyles.list}>
                    <li className={headerStyles.item1}><BurgerIcon type="primary" /><p className={`${headerStyles.item} text text_type_main-small`}>Конструктор</p></li>
                    <li className={headerStyles.item2}><ListIcon type="secondary" /><p className={`${headerStyles.item} text text_type_main-small text_color_inactive`}>Лента заказов</p></li>
                </ul>
                <Logo />
                <div className={headerStyles.profile}><ProfileIcon type="secondary" /><p className={`${headerStyles.item} text text_type_main-small text_color_inactive`}>Личный кабинет</p></div>
            </nav>
        </header>
    )
}

export default AppHeader