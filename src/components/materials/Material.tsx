import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: "35rem",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 18,
	p: 1,
};


const styleButton = {
    width: "99%",
    margin: "5px", 
    padding: "10px", 
    bgcolor: "primary",

}

interface inputProps {
	type: string;
	placeholder: string;
    required: boolean;
    disabled: boolean;
	label: string;
	value: any;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	style?: any;
  	accept?: any;
}



interface toggleButton {
    tagline: string
    banner: React.ReactElement | string | any
}


type props = {
	className: string;
	value: string;
	onClick: () => void;
};


type submitButton = {
    type: string;
    value: string;
    onClick: () => void;
}

type ModalProps = {
	children: React.ReactElement;
};

type BasicSelect = {
    labelId: string,
    name: string,
    value: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type radioGroup = {
    value: string,
    label: string,
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export const BasicModal: React.FC<ModalProps> = ({ children }) => {
	
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<ContainedButton onClick={handleOpen} value="Add" className="" />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<h4>Add Organization</h4>
				
					<div>{children}</div>
				</Box>
			</Modal>
		</div>
	);
};


export const OrdinaryButton = (props: submitButton) => {
	return (
		<Button variant="text" sx={styleButton}>
			{props.value}
		</Button>
	);
};


export const ContainedButton = (props: props) => {
	return (
		<Button
			variant="contained"
			className={props.className}
			onClick={props.onClick}>
			{props.value}
		</Button>
	);
};


export const OutlinedButton = (props: props) => {
	return (
		<Button variant="outlined" className={props.className}>
			{props.value}
		</Button>
	);
};

export const InputField = (props: inputProps) => {
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off">
			<TextField
				id="outlined-basic"
				type={props.type}
				label={props.label}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
				variant="outlined"
                name={props.name}
			/>
		</Box>
	);
};

export const Toggle: React.FC<toggleButton> = ({tagline, banner}) => {
	const [alignment, setAlignment] = useState(tagline);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | any,
	) => {
		setAlignment(newAlignment);
	};

	return (
		<ToggleButtonGroup
			color="primary"
			value={alignment}
			exclusive
			onChange={handleChange}
			aria-label="Platform">
			<ToggleButton value={tagline}>{tagline}</ToggleButton>
			{/* <label htmlFor="file"><div value={banner}>{banner}</div></label> */}
			{/* <input type="file" style={{display:"none"}} id="file" name="files" /> */}
			
		</ToggleButtonGroup>
	);
}


export const  RowRadioButtonsGroup = (props: radioGroup) => {
  return (

        <FormControl sx={{m: 1}}>
        <FormLabel id="demo-row-radio-buttons-group-label">Preferred method of authentication:</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
        >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="phone" control={<Radio />} label="Phone" />
        </RadioGroup>
        </FormControl>
  );
}
 

