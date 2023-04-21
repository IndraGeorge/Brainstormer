import "./loader.css"
import "../App.css"

export function Loader() {
    return (
        <div className="loader">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}


