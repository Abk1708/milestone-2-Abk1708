import { useRouteError } from "react-router-dom";

interface ErrorProps {
    statusText?: string;
    message?: string;
}

const ErrorPage = () => {
    const error = useRouteError() as ErrorProps;
    console.log("Error object:", error);

    return (
        <div id="error-page">
            <h1>{error?.statusText || error?.message}</h1>
            <p>Please return to the previous pages</p>
        </div>
    );
};

export default ErrorPage;
