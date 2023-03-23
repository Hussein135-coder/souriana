const FilterBtns = ({ filter, id }) => {

    const names = ["all", "hussein", "deaa", "saleh"];
    const namesAr = ["الكل", "حسين", "ضياء", "صالح"];

    const btns = names.map((name, i) => {
        return <button key={name} onClick={() => filter(name)} type="button" className={name === id ? "btn active" : "btn"}>{namesAr[i]}</button>
    })

    return (
        <div className='m-auto w-max'>
            <div className="flex gap-3" >
                {btns}
            </div>
        </div>
    )
}

export default FilterBtns