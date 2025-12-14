import ZohoForm from './ZohoForm';
import { Location, Workspace } from '@shared/schema';

interface WorkspaceContactFormProps {
  workspace: Workspace;
  location?: Location | null;
}

export default function WorkspaceContactForm({ workspace, location }: WorkspaceContactFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Get a Quote for {workspace.name}</h2>
        <p className="text-gray-600">
          Starting from ₹{workspace.monthlyPrice}/month{location ? ` in ${location.name}` : ''}
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <ZohoForm 
          className="w-full"
          height="532px"
          width="100%"
        />
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>By submitting this form, you agree to our terms and privacy policy.</p>
        </div>
      </div>
    </div>
  );
}