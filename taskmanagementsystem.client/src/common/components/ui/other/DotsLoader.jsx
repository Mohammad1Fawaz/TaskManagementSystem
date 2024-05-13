const DotsLoader = () => {
    return (
        <div className="flex justify-center">
            <div className="flex items-center rounded-lg px-2">
                <div className="w-3 h-3 rounded-full bg-[var(--button-primary-color)] m-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-[var(--button-primary-color)] m-1 animate-bounce" style={{ animationDelay: '0.7s' }}></div>
                <div className="w-3 h-3 rounded-full bg-[var(--button-primary-color)] animate-bounce" style={{ animationDelay: '0s' }}></div>
            </div>
        </div>
    );
}

export default DotsLoader;
