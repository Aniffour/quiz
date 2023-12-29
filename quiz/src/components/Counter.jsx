function Counter({mins , seconds}) {
    return (
        <div className="counter">
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    )
}

export default Counter
