<div>
      <select id={"IdCliente"} className="px-2 rounded" placeholder="Tipo" onChange={(e) => {
                    let temp = useNovoPedido;
                    temp.idCliente =e.target.value 
                  setNovoPedido(temp)
                }}><option />
                    {useClientes.map((item:cliente)=>
                        <option key={item.id} value={item.id}>{item.nome}</option>
                        )}
                </select>

                <select id={"IdProduto"} className="px-2 rounded" placeholder="Tipo" onChange={(e) => {
                    let temp = useNovoPedido;
                    temp
                  setNovoPedido(temp)
                }}><option />
                    {useClientes.map((item:cliente)=>
                        <option key={item.id} value={item.id}>{item.nome}</option>
                        )}
                </select>
        <button className="customButton" onClick={async () => {
                    console.log(useNovoPedido)
                  const created = await HandleCreate(useNovoPedido)
                  if(created){
                    setNovoPedido({idCliente:"",itens:[]})
                  }
                }}>
                  Criar!
                </button>
      </div>