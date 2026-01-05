import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2,
  Star
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

interface SpeedDialEntry {
  id: string;
  name: string;
  phoneNumber: string;
  country: string;
}

// Mock data
const initialSpeedDials: SpeedDialEntry[] = [
  { id: "1", name: "US Office", phoneNumber: "+1 555 123 4567", country: "United States" },
  { id: "2", name: "Client - John", phoneNumber: "+44 20 7946 0958", country: "United Kingdom" },
  { id: "3", name: "Support Team", phoneNumber: "+49 30 123 4567", country: "Germany" },
];

const SpeedDial = () => {
  const [speedDials, setSpeedDials] = useState<SpeedDialEntry[]>(initialSpeedDials);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const { toast } = useToast();

  const handleCall = (entry: SpeedDialEntry) => {
    toast({
      title: "Calling...",
      description: `Dialing ${entry.name} (${entry.phoneNumber})`,
    });
  };

  const handleDelete = (id: string) => {
    setSpeedDials(speedDials.filter(d => d.id !== id));
    toast({
      title: "Deleted",
      description: "Speed dial entry removed",
    });
  };

  const handleAdd = () => {
    if (!newName || !newNumber) return;
    
    const newEntry: SpeedDialEntry = {
      id: Date.now().toString(),
      name: newName,
      phoneNumber: newNumber,
      country: "Unknown",
    };
    
    setSpeedDials([...speedDials, newEntry]);
    setNewName("");
    setNewNumber("");
    setIsAddDialogOpen(false);
    
    toast({
      title: "Added",
      description: `${newName} added to speed dial`,
    });
  };

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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
                      <p className="text-sm text-muted-foreground">{entry.country}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
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
                  {entry.phoneNumber}
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
