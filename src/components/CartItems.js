import React, { useEffect, useState } from 'react'

function CartItems() {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart')))
  }, [])

  const deleteCartItem = index => {
    const cart_items = localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'))

    if(cart_items.length > 0) {
      cart_items.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart_items))
      setItems(cart_items)
    }
  }

  return (
    <div className="container-column p-60">
      <h3>Cart items</h3>
      {items && items.length ? <table><tbody>
        <tr><td>#</td><td>Title</td><td>Qty</td><td></td></tr>
        {items.map((item, index) => <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <button onClick={() => deleteCartItem(index)}>Delete</button>
          </td>
        </tr>)}
      </tbody></table> : <p>Cart is empty!</p>
      }
    </div>
  )
}

export default CartItems