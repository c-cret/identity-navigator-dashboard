
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Switch, 
} from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { GripVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface KYCField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  enabled: boolean;
  type: 'text' | 'email' | 'number' | 'date' | 'file';
}

interface KYCSettingsFormProps {
  fields: KYCField[];
  onSave: (fields: KYCField[]) => void;
}

const KYCSettingsForm = ({ fields: initialFields, onSave }: KYCSettingsFormProps) => {
  const { toast } = useToast();
  const [fields, setFields] = useState<KYCField[]>(initialFields);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<KYCField['type']>('text');

  const handleAddField = () => {
    if (!newFieldName.trim()) {
      toast({
        title: "Field name required",
        description: "Please enter a name for the new field",
        variant: "destructive",
      });
      return;
    }

    const id = `field_${Date.now()}`;
    const label = newFieldName
      .split(/(?=[A-Z])/)
      .join(' ')
      .replace(/^\w/, c => c.toUpperCase());

    setFields([
      ...fields,
      {
        id,
        name: newFieldName.trim(),
        label,
        required: true,
        enabled: true,
        type: newFieldType,
      }
    ]);

    setNewFieldName('');
  };

  const handleToggleField = (id: string, key: 'enabled' | 'required') => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, [key]: !field[key] } : field
    ));
  };

  const handleSave = () => {
    onSave(fields);
    toast({
      title: "KYC settings saved",
      description: "The identity verification requirements have been updated",
    });
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [movedItem] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedItem);
    setFields(newFields);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Settings</CardTitle>
        <CardDescription>
          Configure the required fields for identity verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div 
              key={field.id} 
              className="flex items-center gap-3 p-3 rounded-md border group hover:border-primary/50 hover:bg-muted/20 transition-colors"
            >
              <div className="cursor-move text-muted-foreground">
                <GripVertical className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{field.label}</h3>
                <p className="text-sm text-muted-foreground">{field.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${field.id}-required`} className="text-sm">Required</Label>
                  <Switch 
                    id={`${field.id}-required`}
                    checked={field.required}
                    onCheckedChange={() => handleToggleField(field.id, 'required')}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${field.id}-enabled`} className="text-sm">Enabled</Label>
                  <Switch 
                    id={`${field.id}-enabled`}
                    checked={field.enabled}
                    onCheckedChange={() => handleToggleField(field.id, 'enabled')}
                  />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => moveField(index, index - 1)}
                    >
                      ↑
                    </Button>
                  )}
                  {index < fields.length - 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => moveField(index, index + 1)}
                    >
                      ↓
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Add New Field</h3>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="new-field-name" className="text-sm">Field Name</Label>
              <Input 
                id="new-field-name"
                placeholder="e.g. phoneNumber"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
              />
            </div>
            <div className="w-[150px]">
              <Label htmlFor="new-field-type" className="text-sm">Field Type</Label>
              <select 
                id="new-field-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as KYCField['type'])}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="file">File</option>
              </select>
            </div>
            <Button onClick={handleAddField}>Add Field</Button>
          </div>
        </div>

        <Separator />

        <Button onClick={handleSave} className="w-full sm:w-auto">Save KYC Settings</Button>
      </CardContent>
    </Card>
  );
};

export default KYCSettingsForm;
