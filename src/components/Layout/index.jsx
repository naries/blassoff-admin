import { FluidContainer } from '../Container/Fluid'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MainWrapper } from './MainWrapper'
import { Notifications } from './Notifications'
import { PageContent } from './PageContent'
import { PageWrapper } from './PageWrapper'
import "./style.css";

export const Layout = (props) => {
    return (
        <MainWrapper>
            <Header />
            <Sidebar />
            <PageWrapper>
                <FluidContainer>
                    <PageContent>
                        {props.children}
                    </PageContent>
                </FluidContainer>
            </PageWrapper>
            <Notifications />
        </MainWrapper>
    )
}
