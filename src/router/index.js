import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('pages/home'))
const UserDetailPage = lazy(() => import('pages/user-detail'))

const AppRoutes = () => (
    <Router>
        <Suspense>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/detalhe/:username" index element={<UserDetailPage />} />
            </Routes>
        </Suspense>
    </Router>
)

export default AppRoutes;