import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="row">
            <div className="col-8 offset-2">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">
                        {error.message}
                        {error.stack}
                    </h4>
                    {/* <% if (process.env.NODE_ENV !== "production") {%>
                <p>
                    <%= err.stack %>
                </p>
                <%}%> */}
                </div>
            </div>
        </div>
    );
}