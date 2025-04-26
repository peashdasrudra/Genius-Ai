"use client"
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface PROPS {
    SelectedTemplate?: TEMPLATE;
    userFormInput: any
    loading: boolean;
}



function FormSection({ SelectedTemplate, userFormInput, loading }: PROPS) {

    const [formData, setFormData] = useState<any>()
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        userFormInput(formData);
    }

    return (
        <div className='p-5 shadow-md border rounded-lg '>
            {/*@ts-ignore*/}
            <Image src={SelectedTemplate?.icon} alt='Icon' width={70} height={70}></Image>
            <h2 className='font-bold text-2xl mb-2 text-primary'>{SelectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm font-semibold'>{SelectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {SelectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col mb-7'>
                        <label className='font-bold'>{item.label}</label>
                        {item.field == "input" ?
                            <input name={item.name} required={item?.required}
                                onChange={handleInputChange}
                            /> :
                            item.field == "textarea" ?
                                <textarea name={item.name} required={item?.required}
                                    onChange={handleInputChange} /> : null
                        }
                    </div>
                ))}

                <Button type="submit" className='w-full py-6'
                    disabled={loading}
                >
                    {loading ? <Loader2Icon className="animate-spin" /> : "Generate Content"}
                </Button>
            </form>
        </div>
    );
}

export default FormSection;
function userFormInput(formData: any) {
    throw new Error('Function not implemented.');
}

