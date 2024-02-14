import { useEffect , useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseItem from "./components/ExpenseItem"
import axios from "axios"

const App = () =>{

  const [expenses, setExpenses] = useState([

    {id: 1, title: "Food", amount:500},
    {id: 2, title: "Movie", amount:-200},
    {id: 3, title: "Shopping", amount:-500},
    {id: 4, title: "Travel", amount:2000}
  ])

  useEffect(() =>{
    axios.get('https://expensetraker-zzp4.onrender.com/get-entries')
    .then(res => {
      console.log(res.data)
      setExpenses(res.data)
    })
    .catch(err => console.log(err))
  },[])

  const addExpenses = (title, amount) =>{
    const nextId = expenses[expenses.length - 1].id +1
    setExpenses([...expenses, {id:nextId,title: title,  amount: amount}])
  }
  const deleteExpense = (id) => {
    console.log(id)
    setExpenses(expenses.filter(exp => exp.id !== id))
  }
   let income =0
   let expense =0
   console.log(expenses)
   expenses.forEach((exp) => {
    if(exp.amount >0){
      income += exp.amount
    }
    else{
      expense -=exp.amount
    }
   })

   let balance= income-expense
    

  return(
   <>
   <div>
   <div className="heading" >Expense Tracker</div>
   <div className="balance" >Balance :{balance}</div>
       <div className ="income-expense-container" >
        <div className="income" >
          <span className="title">Income</span>
          <span>{income}</span>
        </div>
        <div className ="block" ></div>
        <div className="expense" >
          <span className="title">Expense</span>
          <span>{expense}</span>
        </div>
       </div>
        <ExpenseForm  addExpense={addExpenses}/>
      </div>
   {expenses.map((expense) =>(
    <ExpenseItem key = {expense.title} title = {expense.title} amount = {expense.amount} id={expense.id} deleteExpense={deleteExpense}/>
    
   ))}
      </>
  )
}

export default App