import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeleteButton } from "@/components/admin/delete-button";
import { saveTier, deleteTier } from "./actions";

export default async function AdminPricingPage() {
  const tiers = await fetchQuery(api.pricing.list, {});

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Content
      </p>
      <h1 className="mt-2 font-display text-3xl italic">Pricing</h1>
      <p className="mt-2 text-muted-foreground">
        These tiers appear on the homepage and the Pricing page, in this order.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {tiers.map((tier) => (
          <div
            key={tier._id}
            className={
              tier.featured
                ? "flex flex-col gap-4 rounded-2xl border-2 border-primary p-6"
                : "flex flex-col gap-4 rounded-2xl border border-border p-6"
            }
          >
            <form id={`tier-form-${tier._id}`} action={saveTier} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={tier._id} />
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`name-${tier._id}`}>Name</Label>
                  <Input id={`name-${tier._id}`} name="name" defaultValue={tier.name} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`price-${tier._id}`}>Price</Label>
                  <Input id={`price-${tier._id}`} name="price" defaultValue={tier.price} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`timeline-${tier._id}`}>Timeline</Label>
                  <Input id={`timeline-${tier._id}`} name="timeline" defaultValue={tier.timeline} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`order-${tier._id}`}>Order</Label>
                  <Input
                    id={`order-${tier._id}`}
                    name="order"
                    type="number"
                    defaultValue={tier.order}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={`description-${tier._id}`}>Description</Label>
                <Input id={`description-${tier._id}`} name="description" defaultValue={tier.description} required />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={`features-${tier._id}`}>Features (one per line)</Label>
                <Textarea
                  id={`features-${tier._id}`}
                  name="features"
                  defaultValue={tier.features.join("\n")}
                  rows={5}
                  required
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={tier.featured} className="size-4" />
                Featured ("Most popular")
              </label>
            </form>

            <div className="flex gap-2">
              <Button type="submit" form={`tier-form-${tier._id}`} size="sm">
                Save
              </Button>
              <form action={deleteTier}>
                <input type="hidden" name="id" value={tier._id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-6">
        <p className="font-medium">Add a new tier</p>
        <form action={saveTier} className="mt-4 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-name">Name</Label>
              <Input id="new-name" name="name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-price">Price</Label>
              <Input id="new-price" name="price" placeholder="$3,000 – $8,000" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-timeline">Timeline</Label>
              <Input id="new-timeline" name="timeline" placeholder="3–6 weeks" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-order">Order</Label>
              <Input id="new-order" name="order" type="number" defaultValue={tiers.length + 1} required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-description">Description</Label>
            <Input id="new-description" name="description" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-features">Features (one per line)</Label>
            <Textarea id="new-features" name="features" rows={5} required />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" className="size-4" />
            Featured ("Most popular")
          </label>
          <Button type="submit" className="w-fit">
            Add tier
          </Button>
        </form>
      </div>
    </div>
  );
}
