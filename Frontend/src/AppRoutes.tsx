import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ManageIndustryPage from './pages/ManageIndustryPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ProtectedRoute from './auth/ProtectedRoute';
import OrderStatusPage from './pages/OrderStatusPage';
import GetWastePage from './pages/GetWaste';
import GiveawayWastePage from './pages/Giveawaywaste';
import Layout from './layouts/layout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Layout showHero>
                        <HomePage />
                    </Layout>
                }
            />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route
                path="/search/:city"
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }
            />
            <Route
                path="/detail/:industryId"
                element={
                    <Layout showHero={false}>
                        <DetailPage />
                    </Layout>
                }
            />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                />
                <Route
                    path="/order-status"
                    element={
                        <Layout>
                            <OrderStatusPage />
                        </Layout>
                    }
                />
            </Route>
            <Route
                path="/manage-industry"
                element={
                    <Layout>
                        <ManageIndustryPage 
                            onSave={() => {
                                throw new Error('Function not implemented.');
                            }} 
                            isLoading={false}
                        />
                    </Layout>
                }
            />
            <Route
                path="/giveawaywaste"
                element={
                    <Layout>
                        <GiveawayWastePage />
                    </Layout>
                }
            />
            <Route
                path="/getwaste"
                element={
                    <Layout>
                        <GetWastePage />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
