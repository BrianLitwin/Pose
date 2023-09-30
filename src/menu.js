import React from 'react'; // didn't think this had to be here

const Checkbox = ({props}) => {
   const {label, checked, onChange} = props

   return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
           {label}
        </label>
    )
}

const CheckboxGroup = ({props}) => {
    return (
        <div>
            {props.map(checkboxProps => {
                return <Checkbox props={checkboxProps}/>
            })}
        </div>
    )
}

const menuStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '300px',
    height: '100px',
    backgroundColor: 'pink',
}

export const Menu = ({props}) => {

    return (
        <div style={menuStyle}>
          <div>Menu</div>
          <CheckboxGroup props={props}/>
        </div>
    )
}