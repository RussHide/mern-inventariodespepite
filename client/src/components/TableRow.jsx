const TableRow = ({masClases, texto}) => {
    return (
        <td className={`py-3 px-6 text-left ${masClases}`}>
            <div className="flex items-center">
                <span>{texto}</span>
            </div>
        </td>
    )
}

export default TableRow