
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AuthMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  isRecommended?: boolean;
}

interface AuthenticationCardProps {
  methods: AuthMethod[];
  onToggle: (id: string, enabled: boolean) => void;
  className?: string;
}

const AuthenticationCard = ({ methods, onToggle, className }: AuthenticationCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle>Authentication Methods</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {methods.map((method, index) => (
            <div
              key={method.id}
              className="flex items-start justify-between p-4 hover:bg-muted/30 transition-colors"
              style={{ 
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="space-y-1 flex-1 mr-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{method.name}</h3>
                  {method.isRecommended && (
                    <Badge 
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
              <Switch 
                checked={method.enabled}
                onCheckedChange={(checked) => onToggle(method.id, checked)}
                className="mt-0.5"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticationCard;
