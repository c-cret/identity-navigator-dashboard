
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle, Edit, Clock, User, History, IdCard, LogOut, Key, UserPlus, Users, FileText, Settings, Shield, Plus } from 'lucide-react';
import TransitionWrapper from '../../components/TransitionWrapper';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Account, IdentityStatus } from '@/types/identity';
import { format } from 'date-fns';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from 'react-router-dom';

// Mock data
const getMockAccount = (id: string): Account => {
  return {
    id,
    name: "John Smith",
    email: "john.smith@example.com",
    phoneNumber: "+1 (555) 123-4567",
    hasIdentity: true,
    identityStatus: IdentityStatus.APPROVED,
    createdAt: new Date(2025, 2, 12),
    lastLogin: new Date(2025, 3, 1),
    status: "active"
  };
};

// Mock identity info
const mockIdentityInfo = {
  type: "Personal",
  firstName: "John",
  lastName: "Smith",
  dateOfBirth: new Date(1985, 5, 15),
  nationality: "United States",
  documentType: "Passport",
  documentNumber: "123456789",
  documentExpiry: new Date(2030, 5, 15),
  verificationDate: new Date(2025, 2, 15),
  status: IdentityStatus.APPROVED,
  verificationMethod: "Manual",
  verifiedBy: "Admin User"
};

// Mock history events
const mockHistoryEvents = [
  {
    id: "evt1",
    type: "login",
    date: new Date(2025, 3, 5, 10, 30),
    ipAddress: "192.168.1.1",
    device: "iPhone 15, iOS 18"
  },
  {
    id: "evt2",
    type: "passwordChange",
    date: new Date(2025, 3, 2, 14, 15),
    ipAddress: "192.168.1.1",
    device: "MacBook Pro, macOS 16"
  },
  {
    id: "evt3",
    type: "identityVerification",
    date: new Date(2025, 2, 15, 9, 45),
    status: "approved",
    verifiedBy: "Admin User"
  },
  {
    id: "evt4",
    type: "accountCreation",
    date: new Date(2025, 2, 12, 11, 20),
    ipAddress: "192.168.1.2",
    device: "Chrome 120, Windows 11"
  }
];

const AccountDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("account");
  const [openAccounts, setOpenAccounts] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  
  // Get account data
  const account = getMockAccount(id || "");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Neuro-Access</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Access Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Collapsible open={openAccounts} onOpenChange={setOpenAccounts}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="justify-between w-full"
                          isActive={true}
                          tooltip="Accounts & ID"
                        >
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            <span>Accounts & ID</span>
                          </div>
                          <ChevronLeft className={`h-4 w-4 transition-transform ${openAccounts ? 'rotate-90' : ''}`} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-8 mt-1 space-y-1">
                        <SidebarMenuButton 
                          size="sm"
                          isActive={true}
                          onClick={() => navigate('/services/access?view=accounts')}
                          className="text-sm"
                        >
                          <span>Accounts</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton 
                          size="sm"
                          isActive={false}
                          onClick={() => navigate('/services/access?view=identities')}
                          className="text-sm"
                        >
                          <span>Identities</span>
                        </SidebarMenuButton>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <Collapsible open={openSettings} onOpenChange={setOpenSettings}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="justify-between w-full"
                          isActive={false}
                          tooltip="Settings"
                        >
                          <div className="flex items-center">
                            <Settings className="h-5 w-5 mr-2" />
                            <span>Settings</span>
                          </div>
                          <ChevronLeft className={`h-4 w-4 transition-transform ${openSettings ? 'rotate-90' : ''}`} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-8 mt-1 space-y-1">
                        <SidebarMenuButton 
                          size="sm"
                          isActive={false}
                          onClick={() => navigate('/services/access/identity/settings')}
                          className="text-sm"
                        >
                          <span>Identity Settings</span>
                        </SidebarMenuButton>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline" 
                      onClick={() => navigate('/services/access/accounts/new')}
                      tooltip="Add new account"
                    >
                      <Plus className="h-5 w-5" />
                      <span>New Account</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button asChild variant="outline" size="sm" className="mx-4 mb-2">
              <Link to="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="border-b bg-white py-2 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-medium">
                  Account Details: {account.name}
                </h2>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account Details
                </TabsTrigger>
                <TabsTrigger value="identity" className="flex items-center gap-2">
                  <IdCard className="h-4 w-4" />
                  Identity
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Activity History
                </TabsTrigger>
              </TabsList>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                        <p className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="mt-1 font-medium">{account.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="mt-1 font-medium">{account.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="mt-1 font-medium">{account.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Identity Status</h3>
                        <p className="mt-1">
                          {account.hasIdentity ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Not Verified
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                        <p className="mt-1 font-medium">{format(account.createdAt, 'MMMM d, yyyy')}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                        <p className="mt-1 font-medium">{format(account.lastLogin, 'MMMM d, yyyy - h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Identity Tab */}
              <TabsContent value="identity">
                {account.hasIdentity ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-3">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                      <span className="text-sm text-gray-500">
                        Verified on {format(mockIdentityInfo.verificationDate, 'MMMM d, yyyy')} by {mockIdentityInfo.verifiedBy}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Identity Type</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.firstName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.lastName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                          <p className="mt-1 font-medium">{format(mockIdentityInfo.dateOfBirth, 'MMMM d, yyyy')}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.nationality}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Document Type</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.documentType}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Document Number</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.documentNumber}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Document Expiry</h3>
                          <p className="mt-1 font-medium">{format(mockIdentityInfo.documentExpiry, 'MMMM d, yyyy')}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Verification Method</h3>
                          <p className="mt-1 font-medium">{mockIdentityInfo.verificationMethod}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <IdCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Identity Verification</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-4">
                      This user has not completed identity verification yet.
                    </p>
                    <Button variant="outline">
                      Request Identity Verification
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <ul className="space-y-4">
                    {mockHistoryEvents.map((event) => (
                      <li key={event.id} className="border-l-2 border-gray-200 pl-4 py-1">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {event.type === 'login' && <User className="h-5 w-5 text-blue-500" />}
                            {event.type === 'passwordChange' && <Key className="h-5 w-5 text-yellow-500" />}
                            {event.type === 'identityVerification' && <IdCard className="h-5 w-5 text-green-500" />}
                            {event.type === 'accountCreation' && <UserPlus className="h-5 w-5 text-purple-500" />}
                          </div>
                          <div>
                            <p className="font-medium">
                              {event.type === 'login' && 'User logged in'}
                              {event.type === 'passwordChange' && 'Password changed'}
                              {event.type === 'identityVerification' && 'Identity verified'}
                              {event.type === 'accountCreation' && 'Account created'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(event.date, 'MMMM d, yyyy - h:mm a')}
                              {event.ipAddress && ` · ${event.ipAddress}`}
                              {event.device && ` · ${event.device}`}
                              {event.verifiedBy && ` · Verified by ${event.verifiedBy}`}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AccountDetails;
