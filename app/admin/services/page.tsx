import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeleteButton } from "@/components/admin/delete-button";
import { saveService, deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await fetchQuery(api.services.list, {});

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Content
      </p>
      <h1 className="mt-2 font-display text-3xl italic">Services</h1>
      <p className="mt-2 text-muted-foreground">
        These appear on the Services page, in this order.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {services.map((service, i) => (
          <div key={service._id} className="flex flex-col gap-4 rounded-2xl border border-border p-6">
            <form id={`service-form-${service._id}`} action={saveService} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={service._id} />
              <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto]">
                <span className="hidden self-center font-mono text-sm text-muted-foreground sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`title-${service._id}`}>Title</Label>
                  <Input id={`title-${service._id}`} name="title" defaultValue={service.title} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`order-${service._id}`}>Order</Label>
                  <Input
                    id={`order-${service._id}`}
                    name="order"
                    type="number"
                    defaultValue={service.order}
                    className="w-24"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={`description-${service._id}`}>Description</Label>
                <Textarea
                  id={`description-${service._id}`}
                  name="description"
                  defaultValue={service.description}
                  rows={3}
                  required
                />
              </div>
            </form>
            <div className="flex gap-2">
              <Button type="submit" form={`service-form-${service._id}`} size="sm">
                Save
              </Button>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service._id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-6">
        <p className="font-medium">Add a new service</p>
        <form action={saveService} className="mt-4 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-title">Title</Label>
              <Input id="new-title" name="title" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-order">Order</Label>
              <Input
                id="new-order"
                name="order"
                type="number"
                defaultValue={services.length + 1}
                className="w-24"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-description">Description</Label>
            <Textarea id="new-description" name="description" rows={3} required />
          </div>
          <Button type="submit" className="w-fit">
            Add service
          </Button>
        </form>
      </div>
    </div>
  );
}
