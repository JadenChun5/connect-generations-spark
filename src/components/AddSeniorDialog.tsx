import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const seniorSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  last_name: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  age: z.number().min(50, "Age must be at least 50").max(120, "Age must be realistic").optional(),
  bio: z.string().trim().max(500, "Bio must be less than 500 characters").optional(),
  mobility_notes: z.string().trim().max(300, "Mobility notes must be less than 300 characters").optional(),
  interests: z.string().trim().max(200, "Interests must be less than 200 characters").optional(),
  preferred_activities: z.string().trim().max(200, "Preferred activities must be less than 200 characters").optional(),
});

type SeniorFormData = z.infer<typeof seniorSchema>;

interface AddSeniorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSeniorAdded: () => void;
  seniorCenterId: string;
}

export const AddSeniorDialog = ({ 
  open, 
  onOpenChange, 
  onSeniorAdded,
  seniorCenterId 
}: AddSeniorDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interestTags, setInterestTags] = useState<string[]>([]);
  const [activityTags, setActivityTags] = useState<string[]>([]);

  const form = useForm<SeniorFormData>({
    resolver: zodResolver(seniorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      age: undefined,
      bio: "",
      mobility_notes: "",
      interests: "",
      preferred_activities: "",
    },
  });

  const addTag = (value: string, type: 'interests' | 'activities') => {
    if (!value.trim()) return;
    
    const tags = type === 'interests' ? interestTags : activityTags;
    const setTags = type === 'interests' ? setInterestTags : setActivityTags;
    
    if (!tags.includes(value.trim()) && tags.length < 10) {
      setTags([...tags, value.trim()]);
    }
  };

  const removeTag = (tagToRemove: string, type: 'interests' | 'activities') => {
    const tags = type === 'interests' ? interestTags : activityTags;
    const setTags = type === 'interests' ? setInterestTags : setActivityTags;
    
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'interests' | 'activities') => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.currentTarget.value;
      addTag(value, type);
      e.currentTarget.value = '';
    }
  };

  const onSubmit = async (data: SeniorFormData) => {
    setIsSubmitting(true);
    
    try {
      // Check if we're in demo mode
      if (seniorCenterId === 'demo-senior-center-id') {
        // Demo mode: just simulate success without database call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        toast.success("Demo senior profile created successfully!");
        form.reset();
        setInterestTags([]);
        setActivityTags([]);
        onOpenChange(false);
        onSeniorAdded();
        return;
      }

      const seniorData = {
        senior_center_id: seniorCenterId,
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age || null,
        bio: data.bio || null,
        mobility_notes: data.mobility_notes || null,
        interests: interestTags.length > 0 ? interestTags : null,
        preferred_activities: activityTags.length > 0 ? activityTags : null,
      };

      const { error } = await supabase
        .from('seniors')
        .insert([seniorData]);

      if (error) {
        throw error;
      }

      toast.success("Senior profile created successfully!");
      form.reset();
      setInterestTags([]);
      setActivityTags([]);
      onOpenChange(false);
      onSeniorAdded();
    } catch (error) {
      console.error('Error creating senior profile:', error);
      toast.error("Failed to create senior profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Senior Profile</DialogTitle>
          <DialogDescription>
            Create a profile for a new senior resident to enable volunteer matching.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter age" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about this senior (hobbies, background, personality)" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Interests</FormLabel>
              <Input
                placeholder="Type interests and press Enter (e.g., reading, gardening)"
                onKeyDown={(e) => handleKeyDown(e, 'interests')}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {interestTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag, 'interests')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Preferred Activities</FormLabel>
              <Input
                placeholder="Type activities and press Enter (e.g., board games, walking)"
                onKeyDown={(e) => handleKeyDown(e, 'activities')}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {activityTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag, 'activities')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="mobility_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobility Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special mobility considerations or needs" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};