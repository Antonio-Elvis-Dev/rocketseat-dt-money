import * as Dialog from "@radix-ui/react-dialog";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionTypeButton,
  TransactionType,
} from "./styled";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const  createTransaction  = useContextSelector(TransactionsContext,(context)=>{
    return context.createTransaction
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data;
    await createTransaction({ category, description, price, type });
    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            id=""
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            id=""
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            id=""
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} /> Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
