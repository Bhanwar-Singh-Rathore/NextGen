'use client'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { EditorBtns } from '@/lib/constants'
import { addToCart } from '@/lib/queries' // Import your function to add product to the cart
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  element: EditorElement
}

const ProductCardComponent = (props: Props) => {
  const { dispatch, state, userId } = useEditor()
  const router = useRouter()

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('componentType', 'productCard')
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({ userId, productId: props.element.id }) // Modify as per your data structure
      toast({
        title: 'Success',
        description: 'Product added to cart!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Could not add product to cart',
      })
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={clsx('p-4 border border-gray-200', {
        '!border-blue-500': state.editor.selectedElement.id === props.element.id,
      })}
    >
      <Badge>{props.element.name}</Badge>
      <img src={props.element.image} alt={props.element.name} />
      <p>${props.element.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Trash onClick={handleDeleteElement} />
    </div>
  )
}

export default ProductCardComponent
