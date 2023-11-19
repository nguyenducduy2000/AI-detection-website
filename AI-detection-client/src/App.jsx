import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~routes';
import { DefaultLayout } from '~Layout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    const Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
