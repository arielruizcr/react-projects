import React from "react"
import PropTypes from 'prop-types'

const AppHeader = ({ header, body }) => {
    return (
        <div>
            <div className="app-frame">
                <AppHeader title={header}></AppHeader>
                <div>{body}</div>
                <div>App de ejemplo</div>
            </div>
        </div>
    );
}

AppHeader.prototypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired
}

export default AppHeader;