import { useState } from "react"
const ExpenseForm = (props) => {
    const { addExpense } = props

    const [title, setTittle] = useState('')
    const [ amount , setamount] = useState()
    const [errors, setErrors] = useState({})

    const handleSubmit =(e) =>{
      e.preventDefault()
      let err={}
      if (title.length < 3) {
        err.title = 'Title should be atleast 3 characters long' 
      }
      if (!amount) {
        err.amount = 'Enter a valid amount'
      }
      if (Object.keys(err).length > 0) {
        setErrors({...err})
        return
      }
      addExpense(title,amount)
      setTittle('')
      setamount('')
    }
    const handleTittleChange = (e) => {
        console.log(e.target.value)
        setTittle(e.target.value)
        setErrors({...errors,title: ''})
    }
    const handleAmountChange = (e) => {
        console.log(e.target.value)
        setamount(parseInt(e.target.value))
        setErrors({...errors, amount: ''})
    }
    return(
        <form  onSubmit={handleSubmit}>
        <div className="toadd">
        <input className="tittleinput" placeholder="Tittle" value={title} onChange={handleTittleChange} />
        {errors.title ? <div className="error">{errors.title}</div>:null}
        <input className="Amountinput" type="text" placeholder="Amount" value={amount} onChange={handleAmountChange} />
        {errors.amount ? <div className="error">{errors.amount}</div>:null}
        </div>
        <button className="addbutton">Add Expense</button>
        </form>
    )
}



export default ExpenseForm 