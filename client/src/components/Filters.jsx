import Input from 'antd/es/input'
import Select from 'antd/es/select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export const optionsCategory = [
    { value: 'x', label: 'Limpiar filtro' },
    { value: 'INSECTICIDA', label: 'INSECTICIDA' },
    { value: 'ADHERENTE', label: 'ADHERENTE' },
    { value: 'DEFOLIANTE', label: 'DEFOLIANTE' },
    { value: 'REGULADOR', label: 'REGULADOR' },
    { value: 'HERBICIDA', label: 'HERBICIDA' },
    { value: 'SEMILLA', label: 'SEMILLA' },
    { value: 'SEMILLA TRANSGENICA', label: 'SEMILLA TRANSGENICA' },

]

export const optionsQuantity = [
    { value: 'x', label: 'Limpiar filtro' },
    { value: '0-25', label: '0 - 25' },
    { value: '25-50', label: '25 - 50' },
    { value: '50-75', label: '50 - 75' },
    { value: '75-100', label: '75 - 100' },
    { value: '100-125', label: '100 - 125' },
    { value: '100-9999', label: '100 - Infinito' },

]

export const optionsUnit = [
    { value: 'x', label: 'Limpiar filtro' },
    { value: 'KG', label: 'KG' },
    { value: 'L', label: 'L' },
    { value: 'Bulto', label: 'Bulto' },

]

export const CodeFilter = ({ setFilters, filters }) => {
    return (
        <div className='w-full'>
            <Input placeholder='Buscar por codigo' suffix={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />} onChange={(e) => setFilters(prev => ({ ...prev, codigo: e.target.value }))} />
        </div>
    )
}

export const NameFilter = ({ setFilters, filters }) => {
    return (
        <div className='w-full'>
            <Input placeholder='Buscar por nombre' suffix={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />} onChange={(e) => setFilters(prev => ({ ...prev, nombre: e.target.value }))} />
        </div>
    )
}

export const CategoryFilter = ({ setFilters, filters }) => {
    return (
        <div className='w-full'>
            <Select
                className='w-full'
                placeholder="Selecciona una categoria"
                optionFilterProp="children"
                value={filters.categoria ? filters.categoria : null}
                onChange={(e) => setFilters(prev => ({ ...prev, categoria: e }))}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={optionsCategory}
            />
        </div>
    )
}

export const QuantityFilter = ({ setFilters, filters }) => {
    return (
        <div className='w-full'>
            <Select
                className='w-full'
                placeholder="Selecciona una cantidad"
                optionFilterProp="children"
                value={filters.cantidad ? filters.cantidad : null}
                onChange={(e) => setFilters(prev => ({ ...prev, cantidad: e }))}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={optionsQuantity}
            />
        </div>
    )
}

export const UnitFilter = ({ setFilters, filters }) => {
    return (
        <div className='w-full'>
            <Select
                className='w-full'
                placeholder="Selecciona una unidad"
                optionFilterProp="children"
                value={filters.unidad ? filters.unidad : null}
                onChange={(e) => setFilters(prev => ({ ...prev, unidad: e}))}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={optionsUnit}
            />
        </div>
    )
}
