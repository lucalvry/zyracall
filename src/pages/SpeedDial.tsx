import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2,
  Star,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  useSpeedDials, 
  useCreateSpeedDial, 
  useUpdateSpeedDial, 
  useDeleteSpeedDial 
} from "@/hooks/useSpeedDials";

const SpeedDial = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("+1");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: speedDials = [], isLoading, error } = useSpeedDials();
  const createSpeedDial = useCreateSpeedDial();
  const updateSpeedDial = useUpdateSpeedDial();
  const deleteSpeedDial = useDeleteSpeedDial();

  const handleCall = (entry: { name: string; phone_number: string; country_code: string }) => {
    // Navigate to dashboard with pre-filled phone number
    const params = new URLSearchParams({
      phone: entry.phone_number,
      country: entry.country_code,
    });
    navigate(`/dashboard?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSpeedDial.mutateAsync(id);
      toast({
        title: "Deleted",
        description: "Speed dial entry removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete speed dial",
        variant: "destructive",
      });
    }
  };

  const handleAdd = async () => {
    if (!newName || !newNumber) {
      toast({
        title: "Missing fields",
        description: "Please enter a name and phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      await createSpeedDial.mutateAsync({
        name: newName,
        phone_number: newNumber,
        country_code: newCountryCode,
      });
      
      setNewName("");
      setNewNumber("");
      setNewCountryCode("+1");
      setIsAddDialogOpen(false);
      
      toast({
        title: "Added",
        description: `${newName} added to speed dial`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add speed dial",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entry: { id: string; name: string; phone_number: string; country_code: string }) => {
    setEditingId(entry.id);
    setNewName(entry.name);
    setNewNumber(entry.phone_number);
    setNewCountryCode(entry.country_code);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingId || !newName || !newNumber) return;

    try {
      await updateSpeedDial.mutateAsync({
        id: editingId,
        name: newName,
        phone_number: newNumber,
        country_code: newCountryCode,
      });
      
      setNewName("");
      setNewNumber("");
      setNewCountryCode("+1");
      setEditingId(null);
      setIsEditDialogOpen(false);
      
      toast({
        title: "Updated",
        description: "Speed dial updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update speed dial",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8">
          <div className="text-center py-12 text-destructive">
            <p>Failed to load speed dials. Please try again.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Speed Dial</h1>
            <p className="text-muted-foreground">
              Quick access to your frequent contacts
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Speed Dial</DialogTitle>
                <DialogDescription>
                  Add a frequently called number for quick access
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., US Office"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 555 123 4567"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Country Code</Label>
                  <Input
                    id="code"
                    placeholder="+1"
                    value={newCountryCode}
                    onChange={(e) => setNewCountryCode(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} disabled={createSpeedDial.isPending}>
                  {createSpeedDial.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Contact"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Speed Dial</DialogTitle>
              <DialogDescription>
                Update the contact details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code">Country Code</Label>
                <Input
                  id="edit-code"
                  value={newCountryCode}
                  onChange={(e) => setNewCountryCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={updateSpeedDial.isPending}>
                {updateSpeedDial.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Speed Dial Grid */}
        {speedDials.length === 0 ? (
          <div className="text-center py-16">
            <Star className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No speed dials yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your frequently called numbers for quick access
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {speedDials.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-card border border-border shadow-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{entry.name}</h3>
                      <p className="text-sm text-muted-foreground">{entry.country_name || entry.country_code}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(entry)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <p className="text-sm text-foreground mb-4 font-mono">
                  {entry.phone_number}
                </p>
                
                <Button 
                  variant="call" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleCall(entry)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SpeedDial;
