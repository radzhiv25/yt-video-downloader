import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import Rating from '@mui/material/Rating';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  created_at?: string;
}

interface TestimonialDialogProps {
  testimonialForm: Testimonial;
  setTestimonialForm: Dispatch<SetStateAction<Testimonial>>;
  submitting: boolean;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  testimonials: Testimonial[];
  setTestimonials: Dispatch<SetStateAction<Testimonial[]>>;
  supabase: any; // TODO: Replace with proper Supabase client type
  onTestimonialAdded?: () => void; // Callback to refresh stats
}

export function TestimonialDialog({ testimonialForm, setTestimonialForm, submitting, setSubmitting, testimonials, setTestimonials, supabase, onTestimonialAdded }: TestimonialDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    // Add date/time
    const now = new Date();
    const toSend = {
      ...testimonialForm,
      created_at: now.toISOString(),
    };
    // Optimistically update testimonials and close dialog
    setTestimonials([toSend, ...testimonials]);
    setTestimonialForm({ name: "", role: "", content: "", rating: 5 });
    setOpen(false);
    // Insert into supabase
    const { error: insertError } = await supabase.from('testimonials').insert([toSend]);
    if (insertError) {
      setError("Failed to submit testimonial. Please try again.");
      // Remove the optimistically added testimonial
      setTestimonials(testimonials);
      setOpen(true); // Reopen dialog to show error
    } else {
      // Call backend to update user rating
      try {
        await fetch('/api/update-rating', { method: 'POST' });
        // Call callback to refresh stats if provided
        if (onTestimonialAdded) {
          onTestimonialAdded();
        }
      } catch (error) {
        console.error('Failed to update user rating:', error);
      }
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-8">Add Your Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={testimonialForm.name}
              onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={testimonialForm.role}
              onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Testimonial</Label>
            <Textarea
              id="content"
              value={testimonialForm.content}
              onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "16px 0" }}>
              <Rating
                id="rating"
                name="rating"
                value={testimonialForm.rating}
                onChange={(_, newValue) => setTestimonialForm({ ...testimonialForm, rating: newValue || 0.5 })}
                precision={0.5}
                max={5}
                size="large"
                sx={{ fontSize: 48 }} // Makes stars even bigger; adjust as needed
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 