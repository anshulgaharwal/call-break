import React from 'react'
import '../../styles/components/common/button.css'

const Button = ({ children, onClick, className = "", disabled = false, loading = false }) => {
    return (
        <button onClick={onClick} className={"button-component " + className} disabled={disabled || loading}>
            <span className="button-content" style={{ opacity: loading ? 0 : 1 }}>
                {children}
            </span>
            {loading && (
                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
        </button>
    )
}

export default Button