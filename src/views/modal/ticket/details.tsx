"use client"
import { TicketI } from "@/components/forms/ticket.form";
import TicketDatails from "@/views/ticket/ticket-details";
import { Modal } from "@mantine/core"
import { useRouter } from "next/navigation"

const TicketDetailsModal:React.FC<{ticket:TicketI}> = ({ticket}) =>{
    const router = useRouter();
    return <Modal opened onClose={() => router.back()}>
        <TicketDatails ticketData={{ ...ticket}} />
    </Modal>
}

export default TicketDetailsModal