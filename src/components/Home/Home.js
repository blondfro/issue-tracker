import React from 'react';

const Home = ({ loginStatus }) => {
    return (
        <div>
            <h3>
                Welcome to the Issue and User admin portal.
            </h3>
            {
                loginStatus
                    ? <p>
                        Through this portal, you can add, edit and delete users and issues.
                    </p>
                    : <p>
                        Through this portal, you can view current users and issues.
                        To manage content, please log in.
                    </p>
            }
            <p>

            </p>
        </div>
    );
};

export default Home;